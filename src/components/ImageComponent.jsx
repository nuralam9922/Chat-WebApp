import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
function ImageComponent({imageUrl, imageAlt ,width,height,className}) {
  return (
      <LazyLoadImage
          alt={imageAlt && imageAlt}
          height={height && height}
        //   effect='opacity'
          className={`${className && className} bg-blue-gray-200`}
          src={imageUrl} // use normal <img> attributes as props
          width={width && width} />
  )
}

export default ImageComponent