import React, { Component } from "react";

class ImageComponent extends Component{
    render(){
        //Immagine del logo dell'unisalento
        const logo_uni = {
            title: 'logo unisalento',
            path: 'https://keystoneacademic-res.cloudinary.com/image/upload/f_auto/q_auto/g_auto/w_117/dpr_2.0/element/19/198371_198339_img_marchioNERO.png'
        }
        //Usando il this.props verranno specificati l'allineamento dell'immagine e il lato dell'immagine siccome doverebbe essere in cercho
        return(
            <img src={logo_uni.path} alt={logo_uni.path} width={this.props.side} height={this.props.side} align={this.props.align }/>
        )
    }
}
export default ImageComponent;