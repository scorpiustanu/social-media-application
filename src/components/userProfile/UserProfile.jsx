import React from 'react';
const UserProfile = () => {
    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "55px 0px", borderBottom: "0px solid grey" }}>
                <div>
                    <img style={{ width: "100px", height: "100px", borderRadius: "80px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                </div>
                <div>
                    <h4>Tanu Kumari</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>40 posts</h6>
                        <h6>200 followers</h6>
                        <h6>140 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />
                <img className="item" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKi12A3tgAu62QdbNgTljOG2PoS49BLjHOtg&usqp=CAU" alt="" />

            </div>


        </div>
    )
}
export default UserProfile;