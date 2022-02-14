const TCP = require('libp2p-tcp')
const mplex = require('libp2p-mplex')
const { NOISE } = require('@chainsafe/libp2p-noise')
const defaultsDeep = require('@nodeutils/defaults-deep')
const libp2p = require('libp2p')
const KadDHT = require('libp2p-kad-dht')
const CID = require('cids')

async function createLibp2p(_options) {
    const defaults = {
        modules: {
            transport: [TCP],
            streamMuxer: [mplex],
            connEncryption: [NOISE],
            dht: KadDHT, // todo: undo?
        },
        config: {
            dht: {
                enabled: true,
            }
        }
    }

    return libp2p.create(defaultsDeep(_options, defaults))
}

async function main() {
    const libp2p = await createLibp2p()

    const cid = new CID('zU7azfWNQtCXi5bRmKWSZLMxXxeXx3hQEcGGgczavvWUfb3JZ6K1tv3XcVF9')

    await libp2p.contentRouting.provide(cid)
}


main()
