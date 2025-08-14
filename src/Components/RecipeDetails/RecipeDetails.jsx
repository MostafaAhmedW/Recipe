import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { GiMeal } from "react-icons/gi";
import { MoonLoader } from "react-spinners";
import logo from "../../assets/logo.png";

export default function RecipeDetails() {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();

  const getRecipeDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (!data.meals) {
        setRecipeDetail("not-found");
      } else {
        setRecipeDetail(data.meals[0]);
      }
    } catch (error) {
      console.log(error);
      setRecipeDetail("not-found");
    }
  };

  useEffect(() => {
    getRecipeDetails(id);
  }, [id]);

  if (!recipeDetail)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader color="#f29724" size={50} />
      </div>
    );

  if (recipeDetail === "not-found")
    return <p className="text-center mt-10 text-xl">Meal not found!</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetail[`strIngredient${i}`];
    const measure = recipeDetail[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 overflow-y-auto transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <ul className="space-y-2 font-serif mt-4">
          <li>
            <Link to={"/"}>
              <img src={logo} alt="logo" className="block w-52 mx-auto" />
            </Link>
          </li>

          <li className="bg-[#f29724] hover:shadow-white hover:shadow-md rounded-lg shadow-md shadow-orange-300 hover:scale-105 w-48 transition-all duration-300 hover:w-48 mx-auto mt-4">
            <Link
              to="/"
              className="flex items-center p-2 text-white rounded-lg dark:text-black group"
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
      </aside>

      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-5 left-5 z-50 bg-[#e5e8eb] p-3 rounded-lg sm:hidden shadow-md"
      >
        ☰
      </button>

      {/* Main content */}
      <div className="flex-1 ml-0 sm:ml-64 bg-[#F4F2EE] p-5 min-h-screen mt-12">
        <h1 className="text-3xl font-bold mb-5">{recipeDetail.strMeal}</h1>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <img
              src={recipeDetail.strMealThumb || recipeDetail.strSource}
              alt={recipeDetail.strMeal}
              className="w-full rounded-3xl"
            />

            <div className="flex justify-center items-center gap-4 mt-4">
              {recipeDetail.strYoutube && (
                <a
                  href={recipeDetail.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 px-2 py-0.5 rounded-lg flex justify-center items-center text-white"
                >
                  <FaYoutube />
                  <span className="ms-1.5">Youtube</span>
                </a>
              )}

              {recipeDetail.strSource && (
                <a
                  href={recipeDetail.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 px-2 py-0.5 rounded-lg flex justify-center items-center text-white"
                >
                  <TbWorld />
                  <span className="ms-1.5">Source</span>
                </a>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 rounded-lg bg-white shadow">
            <p>
              {recipeDetail.strInstructions.split(" ").slice(0, 180).join(" ")}.
            </p>
          </div>

          <div className="flex-1 bg-gray-400 w-fit h-fit p-4 rounded-xl text-teal-50">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
