const { AbiCoder } = require('web3-eth-abi');

const { GeneratorParams, FieldVector, Convolver } = require('./algebra.js');
const bn128 = require('../../utils/bn128.js');

class AnonProof {
    constructor() {
        this.serialize = () => {

        };
    }
}

class AnonProver {
    constructor() {
        var abiCoder = new AbiCoder(64);

        var params = new GeneratorParams();

        this.generateProof = (statement, witness, salt) => {
            var size = statement['y'].length;
            if (params.size() < size) {
                params.extend(size);
            } // one-off cost when a "new record" size is used.

            var rA = bn128.randomScalar();
            var rB = bn128.randomScalar();
            var rC = bn128.randomScalar();
            var rD = bn128.randomScalar();

            var a = Array.from({ length: 2 }).map(() => Array.from({ length: size - 1 }).map(bn128.randomScalar));
            a = a.map((a_i) => {
                a_i.unshift(a_i.sum().redNeg());
                return new FieldVector(a_i);
            });
            var b = Array.from({ length: 2 }).map((_, i) => new FieldVector(Array.from({ length: size }).map((_, j) => witness['index'][i] == j ? new BN(1).toRed(bn128.q) : new BN(0).toRed(bn128.q))));
            var c = a.map((a_i, i) => a_i.hadamard(b[i].times(new BN(2).toRed(bn128.q)).negate().plus(new BN(1).toRed(bn128.q))));
            var d = a.map((a_i) => a_i.hadamard(a_i).negate())

            var proof = {};
            proof['A'] = params.commit(a[0], a[1], rA);
            proof['B'] = params.commit(b[0], b[1], rB);
            proof['C'] = params.commit(c[0], c[1], rC);
            proof['D'] = params.commit(d[0], d[1], rD);

            proof['inOutG'] = params.getG().mul(witness['rho']);
            proof['gG'] = g.multiply(witness['sigma']);

            proof['CLnG'] = statement['CLn'].commit(a[0]).add(statement['y'].getVector().get(witness['index'][0]).mul(witness['pi']));
            proof['CRnG'] = statement['CRn'].commit(a[0]).add(params.getG().mul(witness['pi']));
            var convolver = new Convolver();
            proof['LG'] = a.map((a_i, i) => convolver.convolution(a_i, statement['L']).extract(0).add(statement['y'].shift(witness['index'][i]).flip().extract(0).times(witness['rho'])));
            proof['yG'] = a.map((a_i, i) => convolver.convolution(a_i, statement['y']).extract(0).add(statement['y'].shift(witness['index'][i]).flip().extract(0).times(witness['sigma'])));

            var cycler = a.map((a_i) => new FieldVector(Array(size / 2).fill(Array.from({ length: 2 }).map((_, j) => a_i.extract(j).sum())).flat())); // test this
            var parityG0 = statement['y'].commit(cycler[0].hadamard(cycler[1]));
            var parityG1 = statement['y'].commit(new FieldVector(Array.from({ length: size }).map((_, j) => cycler[(j + witness['index'][1]) % 2].getVector()[j])));

            proof['challenge'] = utils.hash(abiCoder.encodeParameters([ // diverting with practice to just include this in the proof, but...
                'bytes32',
                'bytes32[2][2][]',
                'bytes32[2][2][]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]',
                'bytes32[2]'
            ], [
                bn128.bytes(salt),
                proof['LG'].map((LG_i) => LG_i.map(bn128.serialize)),
                proof['yG'].map((yG_i) => yG_i.map(bn128.serialize)),
                bn128.serialize(proof['A']),
                bn128.serialize(proof['B']),
                bn128.serialize(proof['C']),
                bn128.serialize(proof['D']),
                bn128.serialize(proof['inOutG']),
                bn128.serialize(proof['gG']),
                bn128.serialize(proof['CLnG']),
                bn128.serialize(proof['CRnG']),
                bn128.serialize(proof['parityG0']),
                bn128.serialize(proof['parityG1'])
            ]));

            proof['f'] = a.map((a_i, i) => new FieldVector(a_i.add(b[i].times(proof['challenge'])).slice(1)));
            proof['zA'] = rB.redMul(challenge).redAdd(rA);
            proof['zC'] = rC.redMul(challenge).redAdd(rD);

            return proof;
        };
    }
}