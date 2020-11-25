exports.testFunction = (req, res) => {
    console.log('ehllo')
    return res.json({
        body: 'macdawg'
    })
};