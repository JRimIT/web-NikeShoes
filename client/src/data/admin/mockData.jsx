import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import axios from "axios";

export const MockDataCountry = [
  { name: "An Giang" },
  { name: "Ba Ria - Vung Tau" },
  { name: "Bac Lieu" },
  { name: "Bac Giang" },
  { name: "Bac Kan" },
  { name: "Bac Ninh" },
  { name: "Ben Tre" },
  { name: "Binh Duong" },
  { name: "Binh Dinh" },
  { name: "Binh Phuoc" },
  { name: "Binh Thuan" },
  { name: "Ca Mau" },
  { name: "Cao Bang" },
  { name: "Can Tho" },
  { name: "Da Nang" },
  { name: "Dak Lak" },
  { name: "Dak Nong" },
  { name: "Dien Bien" },
  { name: "Dong Nai" },
  { name: "Dong Thap" },
  { name: "Gia Lai" },
  { name: "Ha Giang" },
  { name: "Ha Nam" },
  { name: "Ha Noi" },
  { name: "Ha Tinh" },
  { name: "Hai Duong" },
  { name: "Hai Phong" },
  { name: "Hau Giang" },
  { name: "Hoa Binh" },
  { name: "Hung Yen" },
  { name: "Khanh Hoa" },
  { name: "Kien Giang" },
  { name: "Kon Tum" },
  { name: "Lai Chau" },
  { name: "Lam Dong" },
  { name: "Lang Son" },
  { name: "Lao Cai" },
  { name: "Long An" },
  { name: "Nam Dinh" },
  { name: "Nghe An" },
  { name: "Ninh Binh" },
  { name: "Ninh Thuan" },
  { name: "Phu Tho" },
  { name: "Phu Yen" },
  { name: "Quang Binh" },
  { name: "Quang Nam" },
  { name: "Quang Ngai" },
  { name: "Quang Ninh" },
  { name: "Quang Tri" },
  { name: "Soc Trang" },
  { name: "Son La" },
  { name: "Tay Ninh" },
  { name: "Thai Binh" },
  { name: "Thai Nguyen" },
  { name: "Thanh Hoa" },
  { name: "Thua Thien Hue" },
  { name: "Tien Giang" },
  { name: "Ho Chi Minh" },
  { name: "Tra Vinh" },
  { name: "Tuyen Quang" },
  { name: "Vinh Long" },
  { name: "Vinh Phuc" },
  { name: "Yen Bai" },
];
