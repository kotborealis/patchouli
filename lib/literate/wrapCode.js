const wrapCodePure = code => `(async () => {${code}})().then(__blockContext.resolve).catch(__blockContext.reject)`;
const wrapCodeDebugger = code => `
(async () => {
    //debugger;
    ${code}
})()
.then((...args) => {
    //debugger;
    __blockContext.resolve(...args);
})
.catch((...args) => {
    //debugger;
    __blockContext.reject(...args);
})
`;

const wrapCode =
    !!require('inspector').url()
        ? wrapCodeDebugger
        : wrapCodePure;

module.exports = {wrapCode};