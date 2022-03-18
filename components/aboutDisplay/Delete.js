import React from "react";
import axios from "axios";

const DeletePicture = (props) => {
        const image = props.image;
    axios({
        method:'DELETE',
        url: `https://api.imgur.com/3/account/me/image/${image.id}`,
        data: [
        ]
    })

    return (

        <View>
            <button type={"button"} onSubmit={DeletePicture}>Delete your picture</button>
        </View>
    )
}