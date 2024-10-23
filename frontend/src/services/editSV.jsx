
export const updateSV = async (sv, pop) => {
    return await fetch(`http://localhost:3001/${sv._id}`, {
        method: 'PUT',
        body: JSON.stringify(sv),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(res => res.json())
        .then(() => {
            pop("default", "Sửa thông tin thành công!")
            // console.log("Successfull")
        })
        .catch(e => {
            pop("destructive", "Xảy ra lỗi!")
            console.log(e)
        })
}