import React, { useEffect, useState } from "react";
import { GiMeal } from "react-icons/gi";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiWorld } from "react-icons/bi";
import { MoonLoader } from "react-spinners";

export default function Home() {
  const [Category, setCategory] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
  ];

  const getCategory = async (categoryName) => {
    try {
      let url = "";
      if (categoryName === "All") {
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        const { data } = await axios.get(url);
        setCategory(data.meals);
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
        const { data } = await axios.get(url);

        // الآن نجيب التفاصيل لكل وجبة لمعرفة strArea
        const detailedMeals = await Promise.all(
          data.meals.map(async (meal) => {
            const res = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            return res.data.meals[0];
          })
        );
        setCategory(detailedMeals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      setCategory(data.meals || []);
      setActiveCat("All");
    } catch (error) {
      console.log(error);
    }
  };

  // load all meals initially
  useEffect(() => {
    getCategory("All");
  }, []);

  // search تلقائي أثناء الكتابة مع debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        getCategory("All");
      } else {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className=" bg-[#e5e8eb] inline-flex w-fit h-fit items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>

        <aside
          id="default-sidebar"
          className=" fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full bg-gray-50 overflow-y-auto dark:bg-gray-800">
            <ul className="space-y-2 font-serif">
              <li>
                <Link to={"/"}>
                  <img src={logo} alt="logo" className="block w-52 mx-auto" />
                </Link>
              </li>

              <li className="bg-[#f29724] hover:shadow-white hover:shadow-md rounded-lg shadow-md shadow-orange-300 hover:scale-105 w-48 transition-all duration-300 hover:w-48 mx-auto">
                <Link
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg dark:text-black dark:hover:bg-gray-700 group"
                >
                  <GiMeal size={20} />
                  <span className="ms-3">Meals</span>
                </Link>
              </li>

              <li className="border border-gray-400 w-48 hover:scale-105 hover:w-48 transition-all duration-300 bg-amber-50 rounded-lg text-black mt-6 shadow-sm hover:shadow-[#f29760] mx-auto">
                <a
                  href="#"
                  className="flex items-center p-2 rounded-lg dark:text-black dark:hover:bg-gray-700 group"
                >
                  <GiMeal size={20} />
                  <span className="ms-3">Ingredients</span>
                </a>
              </li>

              <li className="border border-gray-400 w-48 hover:scale-105 hover:w-48 transition-all duration-300 bg-amber-50 rounded-lg text-black mt-6 shadow-sm hover:shadow-[#f29760] mx-auto">
                <a
                  href="#"
                  className="flex items-center p-2 rounded-lg dark:text-black dark:hover:bg-gray-700 group"
                >
                  <GiMeal size={20} />
                  <span className="ms-3">Area</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64 bg-gray-200">
          <div className="header-home">
            <h1 className="text-4xl font-bold bg-gradient-to-l from-primary via-[#f29724] to-[#e36f3a] bg-clip-text text-transparent">
              Learn, Cook, Eat Your Food
            </h1>
          </div>

          {/* search for small screens */}
          <div className="mt-4 block md:hidden">
            <input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* tabs for medium and above */}
          <ul className="mt-8 hidden md:flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-2">
            {categories.map((cat) => (
              <li key={cat} className="me-2">
                <button
                  onClick={() => {
                    setActiveCat(cat);
                    getCategory(cat);
                  }}
                  className={`inline-block p-4 px-4 ms-3 rounded-2xl py-2 cursor-pointer transition-all shadow-xl
                  ${activeCat === cat ? "bg-black text-white" : "bg-gray-200"}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <main className="mt-12">
            {!Category || Category.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <MoonLoader color="#f29724" size={60} />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Category.map((category) => (
                  <div
                    key={category.idCategory}
                    className="h-full rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 duration-300 group overflow-hidden"
                  >
                    <div className="rounded-full w-fit h-fit object-cover mx-auto overflow-hidden -translate-y-8 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                      <img
                        src={category.strMealThumb || category.strSource}
                        alt={category.strCategory}
                        className="w-34 h-34 mx-auto"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <h2 className="text-center font-semibold mt-2">
                        {category.strMeal.split("  ").slice(0, 2).join("  ")}
                      </h2>

                      <div className="flex justify-center items-center text-sm">
                        <BiWorld size={14} />
                        <span className="ms-2">{category.strArea}</span>
                      </div>
                      <Link to={`/recipeDetails/${category.idMeal}`}>
                        <button className="bg-green-600 w-full hover:bg-green-700 hover:scale-105 transition-all duration-200 py-1 mt-3 rounded-2xl cursor-pointer text-white font-semibold text-[14px]">
                          View Recipe
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
