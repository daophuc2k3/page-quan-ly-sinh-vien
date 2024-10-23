export const fetchAll = async (page, cap, svs, setSVs, total, setTotal) => {
    await fetch(`http://localhost:3001/?page=${page}&cap=${cap}`)
        .then(res => res.json())
        .then(
            res => {
                // console.log(res);
                setSVs(res.data);
                setTotal(res.total);
            },
            err => {
                console.log(err)
            }
        )
}