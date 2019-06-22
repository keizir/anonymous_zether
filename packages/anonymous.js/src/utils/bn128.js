const BN = require('bn.js')
const EC = require('elliptic')
const crypto = require('crypto')

const { FieldVector } = require('../prover/algebra.js');

const FIELD_MODULUS = new BN("21888242871839275222246405745257275088696311157297823662689037894645226208583", 10);
const GROUP_MODULUS = new BN("21888242871839275222246405745257275088548364400416034343698204186575808495617", 10);
const B_MAX = 4294967295;

const bn128 = {};

// The elliptic.js curve object
bn128.curve = new EC.curve.short({
    a: '0',
    b: '3',
    p: FIELD_MODULUS.toString(16),
    n: GROUP_MODULUS.toString(16),
    gRed: false,
    g: ['77da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4', '1485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875'],
});

bn128.zero = bn128.curve.g.mul(0);

bn128.p = BN.red(bn128.curve.p);
bn128.q = BN.red(bn128.curve.n);

bn128.unity = new BN("14a3074b02521e3b1ed9852e5028452693e87be4e910500c7ba9bbddb2f46edd", 16).toRed(bn128.q);

// Get a random BN in the bn128 curve group's reduction context
bn128.randomScalar = () => {
    return new BN(crypto.randomBytes(32), 16).toRed(bn128.q);
};

bn128.bytes = (i) => { // i is a BN (red)
    return "0x" + i.toString(16, 64);
};

bn128.serialize = (p) => {
    return [bn128.bytes(p.getX()), bn128.bytes(p.getY())];
};

bn128.unserialize = (representation) => {
    return bn128.curve.point(representation[0].slice(2), representation[1].slice(2));
};

bn128.fft = (input, inverse) => { // crazy... i guess this will work for both points and scalars?
    var length = input.length();
    if (length == 1) {
        return input;
    }
    if (length % 2 != 0) {
        throw "Input size must be a power of 2!";
    }
    var omega = bn128.unity.redPow(new BN(1).shln(28).div(new BN(length)));
    if (inverse) {
        omega = omega.redInvm();
    }
    var even = bn128.fft(input.extract(0), inverse);
    var odd = bn128.fft(input.extract(1), inverse);
    var omegas = [new BN(1).toRed(bn128.q)];
    for (var i = 1; i < length / 2; i++) {
        omegas.push(omegas[i - 1].redMul(omega));
    }
    omegas = new FieldVector(omegas);
    var result = even.add(odd.hadamard(omegas)).concat(even.add(odd.hadamard(omegas).negate()));
    if (inverse) {
        result = result.times(new BN(2).toRed(bn128.q).redInvm());
    }
    return result;
};

bn128.circularConvolution = (exponent, base) => {
    return bn128.fft(bn128.fft(base.flip(), false).hadamard(bn128.fft(exponent, false)), true);
};

bn128.B_MAX = B_MAX;

module.exports = bn128;