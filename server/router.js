
const router1 = [
    {
        path: '/home'
    },
    {
        path: '/system',
        children: [
            {
                path: 'name1'
            },
            {
                path: 'name2'
            },
            {
                path: '/system/name3'
            },
            {
                path: '/name4'
            },
        ]
    }
]

module.exports = {
    router1
}