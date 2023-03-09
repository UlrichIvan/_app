import "./loader.css"

function Loader({ display = false }) {
    return (
        <>
            <div className={display ? 'loader' : "loader hide"}>
                <div className="load">loading....</div>
            </div>
        </>
    )
}

export default Loader
