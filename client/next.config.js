/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
        serverActions: true,
    },
    webpack: (config) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        })
        return config
    },
}
