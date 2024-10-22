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
    imageurl:
      "https://www.thebigad.com/wp-content/uploads/2018/01/your-only-limit-is-you-nike-print-ad.jpg",
    name: "Running",
    linkMen: "/products-men/Men's%20Road%20Running%20Shoes", // Thêm URL cho Men's products
    linkWomen: "/products-women/Women's%20Road%20Running%20Shoes"
    
  },
  {
    id: 2,
    imageurl:
      "https://i.pinimg.com/564x/f2/21/27/f22127e751de25f0c19a19618f5b1878.jpg",
    name: "Football",
    link: "/products-women/Football"
  },
  {
    id: 3,
    imageurl:
      "https://i.pinimg.com/564x/b8/39/c2/b839c24dfaf010550eb5e908d396dbbe.jpg",
    name: "Basketball",
    link: "/products-men/Basketball"
  },
  {
    id: 4,
    imageurl:
      "https://i.pinimg.com/564x/35/db/90/35db90ac39458c39f256f1d5588fc90a.jpg",
    name: "Training ang Gym",
    linkMen: "/products-men/Men's%20Workout%20Shoes",
    linkWomen: "/products-women/Women's%20Workout%20Shoes"
  },
  {
    id: 5,
    imageurl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp/35af913353486.5601a5a15d7f5.jpg",
    name: "Tennis",
    linkMen: "/products-men/Men's%20Hard%20Court%20Tennis%20Shoes",
    linkWomen: "/products-women/Women's%20Hard%20Court%20Tennis%20Shoes"
  },
  {
    id: 6,
    imageurl:
      "https://i.pinimg.com/564x/43/45/00/434500c1b7dadc0a6ac2f17f6446598f.jpg",
    name: "Skateboarding",
    link: "/products-men/Skate"
  }
];
