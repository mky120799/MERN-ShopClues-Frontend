import { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { debounce } from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import companyLogo from '../../assets/download.svg';
import userLogo from '../../assets/user.png'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { selectItems, fetchItemsByUserIdAsync } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';
import { fetchProductsByFiltersAsync, setSearchQuery, selectProducts, selectSearchQuery } from '../product/productSlice';


const navigation = [
  { name: 'Products', link: '/products', user: true },
  { name: 'Products', link: '/admin', admin: true },
  { name: 'Orders', link: '/admin/orders', admin: true },

];
const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const products = useSelector(selectProducts);
  const searchQuery = useSelector(selectSearchQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  // Debounced search dispatch
  // Only search if query is not empty
  // Only fetch up to 5 results for dropdown
  const debouncedFetch = useCallback(
    debounce((query) => {
      if (query && query.trim()) {
        dispatch(
          fetchProductsByFiltersAsync({
            filter: { q: query.trim() },
            sort: {},
            pagination: { _page: 1, _limit: 5 },
          })
        );
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedFetch(searchQuery);
    // If input is cleared, close dropdown
    if (!searchQuery || !searchQuery.trim()) {
      setShowDropdown(false);
    }
    // Cleanup on unmount
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, debouncedFetch]);

  // Hide dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearch = (queryParam) => {
    const q = typeof queryParam === "string" ? queryParam : searchQuery;
    if (q && q.trim()) {
      setShowDropdown(false);
      navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDropdownSelect = (product) => {
    setShowDropdown(false);
    dispatch(setSearchQuery(product.title));
    navigate(`/products/${product.id}`);
  };

  const handleReset = () => {
    dispatch(setSearchQuery(""));
    dispatch(
      fetchProductsByFiltersAsync({
        filter: {},
        sort: {},
        pagination: { _page: 1, _limit: 10 },
      })
    );
    setShowDropdown(false);
    const url = new URL(window.location);
    url.searchParams.delete("q");
    const newUrl =
      url.pathname +
      (url.searchParams.toString()
        ? "?" + url.searchParams.toString()
        : "");
    window.history.replaceState({}, "", newUrl);
  };

  return (
    <div>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure
            as="nav"
            className="bg-[#FFFFFF] shadow-md fixed top-0 w-full z-50"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-20 items-center justify-between gap-4 flex-nowrap">
                    <div className="flex items-center gap-2 md:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-16 w-28"
                            src={companyLogo}
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-16 w-28"
                            src={companyLogo}
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-m font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center flex-1 px-4">
                      <div className="w-full md:max-w-lg relative">
                        <div className="flex">
                          <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search for products, brands and more"
                            className="flex-grow rounded-l-md border border-gray-300 bg-[#E8F6F7] px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSearch();
                            }}
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            onClick={() => handleSearch()}
                            className="rounded-r-md bg-orange-500 px-4 text-sm text-white hover:bg-orange-600"
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            onClick={handleReset}
                            className="ml-2 rounded-md bg-gray-200 px-3 text-sm text-black hover:bg-gray-300"
                          >
                            Reset
                          </button>
                        </div>
                        {showDropdown && products && products.length > 0 && (
                          <div
                            ref={dropdownRef}
                            className="absolute left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto"
                          >
                            {products.map((product) => (
                              <div
                                key={product.id}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                onMouseDown={() => handleDropdownSelect(product)}
                              >
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="h-8 w-8 object-cover rounded mr-3"
                                />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm">
                                    {product.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {product.brand}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full bg-white p-1 text-[#8BC9D5] hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full ring-2 ring-[#8BC9D5]"
                                src={userLogo}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden absolute top-20 left-0 w-full z-40 bg-[#fffdf6] shadow-md rounded-b-md border border-red-500 transition-all duration-300 ease-in-out transform">
                  <div className="flex justify-end px-4 pt-4">
                    <Disclosure.Button className="text-gray-500 hover:text-black">
                      <XMarkIcon className="h-6 w-6" />
                    </Disclosure.Button>
                  </div>
                  <div className="block md:hidden px-4 pt-2">
                    <div className="w-full">
                      <div className="flex">
                        <input
                          ref={inputRef}
                          type="text"
                          value={searchQuery}
                          onChange={handleInputChange}
                          placeholder="Search for products, brands and more"
                          className="flex-grow rounded-l-md border border-gray-300 bg-[#E8F6F7] px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                          }}
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={() => handleSearch()}
                          className="rounded-r-md bg-orange-500 px-4 text-sm text-white hover:bg-orange-600"
                        >
                          Search
                        </button>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="ml-2 rounded-md bg-gray-200 px-3 text-sm text-black hover:bg-gray-300"
                        >
                          Reset
                        </button>
                      </div>
                      {showDropdown && products && products.length > 0 && (
                        <div
                          ref={dropdownRef}
                          className="absolute left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto"
                        >
                          {products.map((product) => (
                            <div
                              key={product.id}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                              onMouseDown={() => handleDropdownSelect(product)}
                            >
                              <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-8 w-8 object-cover rounded mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900 text-sm">
                                  {product.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {product.brand}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 px-4 pb-3 pt-2">
                    {navigation.map((item) =>
                      item[userInfo.role] ? (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          to={item.link}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 hover:text-black"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ) : null
                    )}
                  </div>

                  <div className="border-t border-gray-300 px-4 py-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-2">
                        <UserCircleIcon className="h-8 w-8" color="#8BC9D5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {userInfo.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {userInfo.email}
                          </p>
                        </div>
                      </div>
                      <Link to="/cart" className="relative">
                        <ShoppingCartIcon className="h-6 w-6 text-[#8BC9D5]" />
                        {items.length > 0 && (
                          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
                            {items.length}
                          </span>
                        )}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 px-4">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-200 hover:text-black"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <div className="pt-28"></div>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default NavBar;
