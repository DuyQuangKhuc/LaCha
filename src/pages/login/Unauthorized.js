import { useNavigate } from "react-router-dom"
import "./404.css"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div>
            <section className="page_404 ">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">Unauthorized</h1>
                                </div>
                                <div className="contentBox">
                                    
                                    <p>You do not have access to the requested page.</p>
                                    <button className="link_404" onClick={goBack}>
                                        Go to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Unauthorized