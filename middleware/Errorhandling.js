function errorHandling(err, req, res, next) {
    if (err || req.statusCode >= 400) {
        res.json(
            {
                staus:err.status||
                    res.stausCode || 500,
                err: "An error occurred while processing please try again later."
            }
        )
    } next ()
} 
export {
    errorHandling
}