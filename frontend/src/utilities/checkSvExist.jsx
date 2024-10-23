export const searchSv = async (mssv) => {
    try {
        const response = await fetch(`http://localhost:3001/single/?sid=${mssv}`);
        const res = await response.json();

        // console.log(res); 
        return { data: res.data };
    } catch (err) {
        console.error("Error fetching student:", err);
        return { data: null };
    }
}