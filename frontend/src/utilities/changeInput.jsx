import _ from "lodash";

export const handleChangeInput = (val, name, curr, setCurr) => {
    let _sv = _.cloneDeep(curr)
    _sv[name] = val;
    // console.log(_sv)
    setCurr(_sv)
}