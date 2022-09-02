import { api } from '../helper';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import axios from 'axios';
import Card from '../components/Card';
import Category from '../components/Category';
import Tags from '../components/Tags';
import Skeleton from '../components/Skeleton';

export default function Index() {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [sendCategory, setSendCategory] = useState({});
  const [sendTag, setSendTag] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(localStorage.getItem('token')); //the token needs to get renewed whenever the page renders or else the token will get the value previous token after login (and to get the newly login token you would even need to refresh the page)

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const checkAuth = async () => {
    try {
      await axios.get(`${api}/auth/me`, authHeaders).then((res) => {
        if (res.data.error !== 1) {
          setUserDetail(res.data);
        }
      });
    } catch (err) {
      console.log(err, 'error check auth');
    }
  };

  const getCountCart = async () => {
    try {
      await axios.get(`${api}/api/carts`, authHeaders).then((res) => {
        setCountCart(
          res.data
            .map((item) => item.qty)
            .reduce((preVal, currentVal) => preVal + currentVal, 0),
        ); //
        setCarts(res.data);
      });
    } catch (err) {
      console.log(err, 'cant get the count carts');
    }
  };

  const getProduct = async () => {
    try {
      await axios
        .get(`${api}/api/products`)
        .then((res) => setProducts(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const getTags = async () => {
    try {
      await axios.get(`${api}/api/tags`).then((res) => {
        if (res.data.error !== 1) {
          setTags(res.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCagetories = async () => {
    try {
      await axios
        .get(`${api}/api/categories`)
        .then((res) => setCategories(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const addCarts = async (product) => {
    try {
      const {
        category,
        tags,
        description,
        createdAt,
        updatedAt,
        __v,
        _id,
        ...remainProduct
      } = product; //this step is to put apart : name, price, img_url
      let newDataProduct = remainProduct;

      if (carts.find((item) => item.product._id === _id)) {
        newDataProduct = carts.map((item) => ({
          ...item,
          qty: item.product._id === _id ? item.qty + 1 : item.qty,
        })); //only adding 1 qty if the data is already exist
      } else {
        newDataProduct = [
          ...carts,
          { qty: 1, product: product, user: userDetail, ...remainProduct },
        ]; //adding new data if the data is not exist....  note : product is from parameter product, userDetail is from useState above
      }

      let dataCountCarts = newDataProduct
        .map((item) => item.qty)
        .reduce((preVal, currentVal) => preVal + currentVal, 0); //summing of all the qtys amount
      setCountCart(dataCountCarts); //changing the count carts
      setCarts(newDataProduct); //changing the state carts

      await axios.put(
        `${api}/api/carts`,
        { items: newDataProduct },
        authHeaders,
      ); // send the data to the api whenever the carts value is changing
    } catch (err) {
      console.log(err, 'cant add carts');
    }
  };

  const toCarts = async () => {
    try {
      navigate('/user/carts');
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/auth/logout`, null, authHeaders).then((res) => {
        if (res.data.error !== 1) {
          localStorage.removeItem('token');
          setUserDetail([]);
          setToken('');
        }
      });
    } catch (err) {
      console.log(err, "can't logout");
    }
  };

  const getPage = async () => {
    try {
      let linkApi = `${api}/api/products?`; //initial request link

      let selectedCategory = '';
      if (sendCategory.name === undefined) {
        selectedCategory = '';
      } else if (sendCategory.name === 'Category:') {
        selectedCategory = '';
      } else {
        selectedCategory = `category=${sendCategory.name}`;
      }

      let selectedTags = [];
      if (sendTag.length !== 0) {
        selectedTags = sendTag
          .map((item, index) => `tags[${index}]=${item.name}`)
          .join('&');
      } else {
        selectedTags = '';
      }

      let selectedQuery = '';
      if (query.length !== 0) {
        selectedQuery = `q=${query}`;
      } else {
        selectedQuery = '';
      }

      let skip = '';
      if (page === 1) {
        skip = '';
      } else {
        skip = `skip=${(page - 1) * 10}`;
      }

      // this is full link for requesting the content page
      let sendLinkApi = `${linkApi}${
        selectedCategory !== '' ? `${selectedCategory}&&` : ''
      }${selectedTags !== '' ? `${selectedTags}&&` : ''}${
        selectedQuery !== '' ? selectedQuery : ''
      }${skip !== '' ? skip : ''}`;

      await axios(sendLinkApi).then((res) => setProducts(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    checkAuth();
    getTags();
    getCagetories();
    getCountCart();
    getProduct();
  }, []);

  useEffect(() => {
    getPage();
    console.log('im hereeee', process.env);
  }, [sendCategory, sendTag, query, page]);

  return (
    <div>
      <div className='bg-gradient-to-t from-sky-600 via-blue-500 to-sky-600 drop-shadow-md'>
        <div className='py-4 border-b border-white/10'>
          <div className='container'>
            <nav className='flex items-center justify-between'>
              <div className='text-xl font-medium text-white'>
                <Link to='/'>FakeCOPEE</Link>
              </div>

              <div className='flex items-center w-2/5 gap-x-2'>
                <Category
                  dataCategories={categories}
                  setSendCategory={setSendCategory}
                />
                <span className='pb-1 text-white'>|</span>
                <input
                  type='text'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className='py-0.5 px-2 focus:outline-none w-full shadow-sm border-none rounded-md focus:ring focus:ring-sky-300'
                  placeholder='search something'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>

              {/* Checking auth start */}
              {!!userDetail.full_name ? (
                <div className='flex items-center text-white gap-x-2'>
                  <p>{countCart}</p>
                  <div onClick={() => toCarts()} className='hover:text-sky-200'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                  </div>
                  <Menu as={'div'} className='relative'>
                    <Menu.Button
                      className={`${
                        userDetail.role === 'admin' ? 'font-bold' : ''
                      } relative capitalize justify-end flex items-center px-2 py-1 rounded-lg hover:bg-blue-700/40 gap-x-3`}
                    >
                      {`${userDetail.full_name}`}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-5 h-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </Menu.Button>
                    <Menu.Items
                      as={'div'}
                      className='absolute items-center w-full mt-2 overflow-hidden text-gray-700 bg-white rounded-md'
                    >
                      <Menu.Item className='block w-full px-4 py-2 hover:text-black hover:bg-sky-100'>
                        <Link to={'/user/account'}>Account</Link>
                      </Menu.Item>
                      <Menu.Item
                        className='block w-full px-4 py-2 hover:text-black hover:bg-red-100'
                        onClick={(e) => logout(e)}
                      >
                        <a href='/'>Logout</a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              ) : (
                <div className='flex items-center text-white gap-x-2'>
                  <Link
                    to='/login'
                    className='px-2 py-1 rounded-lg hover:bg-blue-700/40 '
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/signup'
                    className='px-2 py-1 rounded-lg hover:bg-blue-700/40 '
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {/* Checking auth end */}
            </nav>
          </div>
        </div>
      </div>
      <div className='bg-sky-200 '>
        <div className='container'>
          <div className='bg-sky-50'>
            <div className='flex items-center justify-center pt-2 mx-auto'>
              Tags:
            </div>
            <div className='flex py-2 mx-auto gap-x-2'>
              <Tags dataTags={tags} setSendTag={setSendTag} />
            </div>

            {/* Products start */}
            <hr className='mx-5 border-gray-300' />
            {products.length !== 0 ? (
              <div className='grid grid-cols-5 gap-4 mx-6 my-4'>
                {products.data.map((product) => (
                  <div key={product._id}>
                    <Card
                      dataProduct={product}
                      dataUser={userDetail}
                      onClick={() => addCarts(product)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-5 gap-4 mx-6 my-4'>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
              </div>
            )}
            <hr className='mx-5 border-gray-300' />
            {/* Products end */}

            <div className='flex items-center justify-center w-1/3 pt-2 pb-4 mx-auto gap-x-2'>
              {page === 1 ? (
                ''
              ) : (
                <button onClick={() => prevPage()} className='absolute mr-24'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                </button>
              )}
              <div className='py-0.5 px-6 rounded-md shadow-sm items-center justify-center border'>
                {page}
              </div>
              {products.data?.length <= 10 && page * 10 < products.count ? (
                <button onClick={() => nextPage()} className='absolute ml-24'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
