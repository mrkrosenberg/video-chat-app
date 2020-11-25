exports.testFunction = (req, res) => {
    console.log('ehllo');
    console.error('there has been an error')
    return res.json({
        body: 'macdawg'
    })
};