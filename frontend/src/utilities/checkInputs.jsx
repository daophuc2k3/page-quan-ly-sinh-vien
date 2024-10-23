const checkInfo = (sv, valid, setValid) => {
    if (!sv.Name.trim()) setValid(pre => ({ ...pre, name: false }))
    if (!sv.StudentID) setValid(pre => ({ ...pre, mssv: false }))
    if (!sv.Birthday) setValid(pre => ({ ...pre, birth: false }))
    return (sv.Name.trim() && sv.StudentID && sv.Birthday) ? true : false
}

export { checkInfo }