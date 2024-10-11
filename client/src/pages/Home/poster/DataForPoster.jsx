export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export const productData = [
  {
    id: 1,
    imageurl:"https://i.pinimg.com/564x/52/bc/4a/52bc4a1a727c621f7522adf64271f560.jpg",
    title: "Air Jordan",
    description: "Over the years, Air Jordans have become highly coveted both as performance shoes for athletes and as fashionable collectibles."
  },
  {
    id: 2,
    imageurl:"https://i.pinimg.com/736x/4e/35/b1/4e35b1694c022865138a7a0c884b1595.jpg",
      title: "Air Force 1",
    description: "Over the years, the Air Force 1 has transitioned from sportswear to a popular streetwear staple due to its simple yet timeless design."
  },
  {
    id: 3,
    imageurl:"https://i.pinimg.com/564x/0e/0a/b1/0e0ab1ab2733fa7ac4916ac06071f210.jpg",
      title: "For playtime",
    description: "Add instant energy to your next run."
  }
];