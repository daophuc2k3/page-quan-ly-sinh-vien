export const deleteSv = async (id, pop) => {
    return await fetch(`http://localhost:3001/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(() => {
            pop("default", "Đã xóa sinh viên thành công!")
            // console.log("Deleted");
        })
        .catch(e => {
            pop("destructive", "Xảy ra lỗi")
            console.log(e)
        })
}