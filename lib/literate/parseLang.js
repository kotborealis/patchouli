const parseLang = lang => {
    const res = {};
    if(lang.indexOf('.noeval') > 0)
        res.noeval = true;
    if(lang.indexOf('.hide') > 0)
        res.hide = true;
    return res;
};

module.exports.parseLang = parseLang;