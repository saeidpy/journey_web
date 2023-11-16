import {QueryClient, QueryClientProvider, QueryErrorResetBoundary, useQueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React, {lazy} from 'react'
import ReactDOM from 'react-dom/client'
import {ErrorBoundary} from 'react-error-boundary'

import {fetchProjects} from './queries'

import Button from './components/Button'

const Projects = lazy(() => import('./components/Projects'))
const Project = lazy(() => import('./components/Project'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const queryClient = useQueryClient()
  const [showProjects, setShowProjects] = React.useState(false)
  const [activeProject, setActiveProject] = React.useState(null)

  return (
    <>
      <Button
        onClick={() => {
          setShowProjects((old) => {
            if (!old) {
              queryClient.prefetchQuery({
                queryKey: ['projects'],
                queryFn: fetchProjects,
              })
            }
            return !old
          })
        }}
      >
        {showProjects ? 'Hide Projects' : 'Show Projects'}
      </Button>

      <hr />

      <QueryErrorResetBoundary>
        {({reset}) => (
          <ErrorBoundary
            fallbackRender={({error, resetErrorBoundary}) => (
              <div>
                There was an error! <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<h1>Loading projects...</h1>}>
              {showProjects ? (
                activeProject ? (
                  <Project activeProject={activeProject} setActiveProject={setActiveProject} />
                ) : (
                  <Projects setActiveProject={setActiveProject} />
                )
              ) : null}
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)

const list = [
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'امروزه از بنای موسوم به مدرسه امیر شاه ملک اثری بر جای نمانده است . اما به اعتقاد برخی از محققان از جمله گلبمک این بنا در ضلع جنوبی مجموعه وجود داشته و در حال حاضر ساختمان جدید جایگزین آن شده است .',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.837934',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.837934',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:46.706894+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:46.706866+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 9.81,
            lon: 15.2,
          },
          location_id: 4484,
        },
        location_id: 4484,
        street: null,
      },
      location_id: 4484,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'مدرسه امیر شاه ملک',
    name_fa: 'مدرسه امیر شاه ملک',
    normalized_name: 'مدرسهامیرشاهملک',
    resort_id: 4484,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'بنای مشهور به مسجد جامع نو در پشت گنبد خانه و ایوان مجموعه قرار دارد. راه دسترسی به فضاهای معماری آن از صحن کوچک سراچه است و در جلو بنا صحن وسیعی است که در حال حاضر آجر فرش است در طرفین ورودی مسجد جامع قاب های آجری زیبائی ایجاد شده و به جز همین قابهای تزئینی در نمای بیرونی آن عناصر تزئینی دیگری دیده نمی شود . پوشش ایوان ورودی نیز آراسته به رسمی بندی است.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838021',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838021',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:51.929876+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:51.929845+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 2.61,
            lon: 33.72,
          },
          location_id: 4485,
        },
        location_id: 4485,
        street: null,
      },
      location_id: 4485,
      street: null,
    },
    media_count: 3,
    media_list: [],
    name_en: 'مسجد جامع نو',
    name_fa: 'مسجد جامع نو',
    normalized_name: 'مسجدجامعنو',
    resort_id: 4485,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'این مسجد در جانب غربی مزار واقع است که با یک مقصوره چلیپا شکل و شبستان های ستون دار طرفین صحن،فضایی مذهبی را شکل می دهد. رواق شرقی این بنا با مسجد عتیق پیوند خورده و ظاهراً تنها بخش قدیمی مسجد گنبد مقصوره است که توسط (جلال الدین فیروز شاه) به سال ۸۴۶ ه.ق بنیاد شده است.در بخش خلفی دیوار گنبد خانه کتیبه ای با قلم شیوای ثلث به رنگ سفید بر زمینه ای فیروزه ای بر جای مانده که حاوی نام معمار بنا و تاریخ ساخت آن است .',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838079',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838079',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.235473+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.235445+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 27.5,
            lon: 16.56,
          },
          location_id: 4486,
        },
        location_id: 4486,
        street: null,
      },
      location_id: 4486,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'مسجد جامع نو',
    name_fa: 'مسجد جامع نو',
    normalized_name: 'مسجدجامعنو',
    resort_id: 4486,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'این بنا در سمت چپ ایوان قرار دارد و ظاهراً نام آن منسوب به سازنده بنا (خواجه زکی بن محمد بن مسعود کرمانی) است. مسجد کرمانی با ابعاد۱۷×۷۰/۱۰متر مشتمل بر شاه نشین در وسط هر ضلع و سه چله خانه در زوایای شرقی و غربی است که در شاه نشین واقع در ضلع غربی زیبا ترین عنصر معماری این مسجد یعنی محراب گچ بری و نفیس آن از شاهکارهای قرن هشتم هجری ساخته شده است.بر ازاره دیوارها نیز یک رشته کتیبه عالی نقش بسته و بر اسپرها قاب های مشبک گچبری تعبیه شده که حکایت از مهارت و درایت هنرمندان آن است. شاه نشین های واقع در زوایای جنوبی و شمالی دارای پوشش نیم گنبدی بوده وجود تاق و تویزه ،ایجاد گنبد بر روی آن ها را ممکن نموده است .',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838133',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838133',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.373392+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.373363+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 3.81,
            lon: 19.97,
          },
          location_id: 4487,
        },
        location_id: 4487,
        street: null,
      },
      location_id: 4487,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'مسجد کرمانی',
    name_fa: 'مسجد کرمانی',
    normalized_name: 'مسجدکرمانی',
    resort_id: 4487,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'این اثر که در واقع آخرین بنا از ابنیه موجود در مجموعه معماری مزار شیخ احمد جام محسوب می شود ،در کجاورت فضای ورودی و جنب آب انبار قرار دارد . در پشت این بنا نیز فضایی سبز ومشجر روبروی مزار شیخ جام واقع است . از دیدگاه معماری مسجد زیر زمینی مشتمل بر دو قسمت زمستانی و تابستانی است . مسجد زیر زمینی( زمستانی ) پایین تر از سطح معابر وگذرگاه ها است که ساختار آن گویای هویت و اصالت آن می باشد.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838185',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838185',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.489832+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.489803+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 18.03,
            lon: 13.14,
          },
          location_id: 4488,
        },
        location_id: 4488,
        street: null,
      },
      location_id: 4488,
      street: null,
    },
    media_count: 2,
    media_list: [],
    name_en: 'مسجد زیر زمینی',
    name_fa: 'مسجد زیر زمینی',
    normalized_name: 'مسجدزیرزمینی',
    resort_id: 4488,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'در حدود ۳ کیلومتری جنوب روستای (بزد) مسجد کوچکی با دیوارهای سنگی و گلی مشاهده می شود که به (مسجد خانه نور) شهرت دارد. این مسجد اگر چه ارزش معماری چندانی ندارد اما مکانی بوده که در نزد شیخ احمد جام از اهمیت و اعتبار خاصی برخوردار بوده است. این اثر معماری با زیر بنایی محدود دارای پوشش مسقف با استفاده از تیرهای چوبی است. رویه دیوار گچ اندود بوده و فاقد هر گونه تزئین است.در گوشه ای از بنا حفره ای با در کوچک تعبیه شده که آن را چله خانه شیخ می دانند. به فاصله ۲۰۰ متری ضلع جنوبی مسجد چشمه جوشانی به نام (نور) واقع است که آب آن وارد حوض زیبای سر پوشیده ای می شود و به احتمال بسیار سقایه مسجد نور بوده اما اکنون به صورت نیمه ویران است.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838243',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838243',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.601001+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.600972+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 35.57,
            lon: 31.7,
          },
          location_id: 4489,
        },
        location_id: 4489,
        street: null,
      },
      location_id: 4489,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'مسجد خانه نور',
    name_fa: 'مسجد خانه نور',
    normalized_name: 'مسجدخانهنور',
    resort_id: 4489,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'natural',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'این ناحیه که از تپه ماهورهای دیدنی تشکیل شده است در ۵۵ کیلومتری شمال شهرستان تربت جام قرار دارد. منطقه باغ کشمیر در سال ۱۳۷۵ به مدت پنج سال منطقه شکار ممنوع اعلام شد و سپس در سال ۱۳۸۱ به علت وجود جنگل‌های پسته وحشی تبدیل به منطقه حفاظت شده جنگلی گردید. جنگل‌ها و توده‌های درختان پسته وحشی از قدیم‌الایام در منطقه باغ کشمیر به صورت پراکنده وجود داشته و به عنوان یکی از ذخیره‌گاه‌های ژنتیکی برای پسته محسوب می‌شود بنابراین حفاظت از آن و حفظ و تکثیر طبیعی وحوش از جمله اهداف حفاظت از منطقه می‌باشد. حیات وحش منطقه قوچ، میش، گراز، گربه وحشی، گرگ، روباه، شغال و پرندگان آن کبک، تیهو، سارگپه، بلدرچین، کلاغ. سبزقبا، شاهین، قمری، سهره، قرقی و عقاب می‌باشد. با توجه به کوهستانی بودن منطقه تعداد ۱۴ چشمه در نقاط مختلف آن شناسایی شده که از جمله آن‌ها چشمه چاه بالا، بیگ مراد، حلقگی، چهارسبز، پلنگی، زیری، شله، گله گاش و چشمه چاه بوناک قابل ذکر می‌باشند.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838335',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838335',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.697687+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.697659+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 29.67,
            lon: 33.61,
          },
          location_id: 4490,
        },
        location_id: 4490,
        street: null,
      },
      location_id: 4490,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'باغ کشمیر',
    name_fa: 'باغ کشمیر',
    normalized_name: 'باغکشمیر',
    resort_id: 4490,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'garden',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'آرامگاه شیخ احمد جامی یکی از جاذبه‌های گردشگری استان خراسان رضوی است که در حاشیه شمال غربی شهرستان تربت جام در کنار مقبره و مسجد خواجه عزیزالله در محله‌ای که سعدآباد خوانده می‌شود، قرار دارد.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838390',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838390',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.812203+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.812175+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 27.92,
            lon: 10.5,
          },
          location_id: 4491,
        },
        location_id: 4491,
        street: null,
      },
      location_id: 4491,
      street: null,
    },
    media_count: 9,
    media_list: [],
    name_en: 'آرامگاه شیخ احمد جامی',
    name_fa: 'آرامگاه شیخ احمد جامی',
    normalized_name: 'آرامگاهشیخاحمدجامی',
    resort_id: 4491,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'shrine',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'فضاهای معماری مسجد مشتمل بر شبستانی گنبددار شامل پنج رواق است. آن چه از معماری بنا بر جای مانده،حکایت از آن دارد که تنها دو دهانه غربی گنبد مقابل محراب دارای تزئینات بوده که شامل گچ بری های مطبق اسلیمی بر تاق های رواق محراب،رنگ های الوان بر روی اندود گچ،ستون نماها با طرح مارپیچ و کاشی سفید و آبی در اطراف محوطه محراب بوده است. بر اساس شواهد موجود سبک بنا به معماری سده هشتم نزدیک تر می نماید. در متون ،بانی خیر مسجد عتیق را (رضی الدین احمد متولی) و متعلق به ۷۲۰ ه.ق ذکر نموده اند.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838444',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838444',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:52.950089+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:52.950060+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 17.58,
            lon: 22.45,
          },
          location_id: 4492,
        },
        location_id: 4492,
        street: null,
      },
      location_id: 4492,
      street: null,
    },
    media_count: 4,
    media_list: [],
    name_en: 'مسجد عتیق',
    name_fa: 'مسجد عتیق',
    normalized_name: 'مسجدعتیق',
    resort_id: 4492,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'mosque',
    visited_count: 0,
  },
  {
    category: 'natural',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'آبشار بردو در استان خراسان رضوی واقع است. این آبشار در ۲ کیلومتری غرب روستای شورآب علیا از توابع شهرستان تربت جام واقع است. آبشار از ارتفاع ۳۰ متری بر روی شیار کوه و بر روی شیب صخره ای به پایین میریزد. ارتفاع آبشار از سطح دریا ۱۴۶۰ متر است و در پیرامون آن صخره های خزه بسته مناظر زیبایی ایجاد کرده است. روستای شوراب علیا ، روستایی از توابع بخش نصرآباد، دهستان کاریزان و در شهرستان تربت جام است. دسترسی به آبشار از طریق جاده ارتباطی فریمان به ترتبت جام، بعد از روستای کهریز نو، جاده فرعی روستای شوراب علیا میسر است. آبشار در میان تنگه شرقی روستا در فاصله ۲ کیلومتری روستا واقع شده است.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838533',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838533',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:53.042073+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:53.042045+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 27.67,
            lon: 21.15,
          },
          location_id: 4493,
        },
        location_id: 4493,
        street: null,
      },
      location_id: 4493,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'آبشار بردو',
    name_fa: 'آبشار بردو',
    normalized_name: 'آبشاربردو',
    resort_id: 4493,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'waterfall',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'آرامگاه شاه قاسم انوار ، یکی از مکان‌ های تاریخی و دیدنی شهرستان تربت جام آرامگاه شاه قاسم انوار است. آرامگاه شاه قاسم انوار در روستای لنگر واقع شده و در تاریخ ۱۶ اردیبهشت ۱۳۵۴ با شمارهٔ ثبت ۱۰۶۱ به ‌عنوان یکی از آثار ملی ایران به ثبت رسیده است. این آرامگاه به دست «امیرعلیشیرنوایی» ساخته شده و دارای کتیبه‌ هایی از دوره صفویه نیز می باشد.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838587',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838587',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:53.155224+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:53.155186+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 16.21,
            lon: 29.32,
          },
          location_id: 4494,
        },
        location_id: 4494,
        street: null,
      },
      location_id: 4494,
      street: null,
    },
    media_count: 6,
    media_list: [],
    name_en: 'آرامگاه شاه قاسم انوار',
    name_fa: 'آرامگاه شاه قاسم انوار',
    normalized_name: 'آرامگاهشاهقاسمانوار',
    resort_id: 4494,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'shrine',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'آرامگاه شیخ ابوذر بوزجانی، از عارفان و شاعران سده چهارم در حاشیه ویرانه‌ های شهر قدیم بوزجان، در ۱۵ کیلومتری شرق تربت جام قرار دارد. این مقبره که از جاذبه های گردشگری تربت جام به شمار می‌ رود، یک ایوانچه ورودی هم داشته که در سال‌ های اخیر تخریب شده است.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838641',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838641',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:53.277891+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:53.277863+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 6.2,
            lon: 2.98,
          },
          location_id: 4495,
        },
        location_id: 4495,
        street: null,
      },
      location_id: 4495,
      street: null,
    },
    media_count: 2,
    media_list: [],
    name_en: 'آرامگاه شیخ ابوذر بوزجانی',
    name_fa: 'آرامگاه شیخ ابوذر بوزجانی',
    normalized_name: 'آرامگاهشیخابوذربوزجانی',
    resort_id: 4495,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'shrine',
    visited_count: 0,
  },
  {
    category: 'historical',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'حمام عزت تربت جام مربوط به دوره پهلوی است و در خیابان قاضی زاده، چهارراه میرقوام الدین، اوائل کوچه مخابرات در تربت جام واقع شده است. این بنا در تاریخ ۱۲ بهمن ۱۳۸۱ با شمارهٔ ثبت ۷۲۲۳ به ‌عنوان یکی از آثار ملی ایران به ثبت رسیده است.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838694',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838694',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:53.438794+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:53.438765+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 11.75,
            lon: 5.11,
          },
          location_id: 4496,
        },
        location_id: 4496,
        street: null,
      },
      location_id: 4496,
      street: null,
    },
    media_count: 1,
    media_list: [],
    name_en: 'حمام عزت تربت جام',
    name_fa: 'حمام عزت تربت جام',
    normalized_name: 'حمامعزتتربتجام',
    resort_id: 4496,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'bathroom',
    visited_count: 0,
  },
  {
    category: 'natural',
    comment_count: 0,
    comments: [],
    creator: null,
    description:
      'آبشار رونج تربت جام یکی از جاذبه های گردشگری این منطقه می باشد . روستای رونج روستایی در شهرستان تربت جام استان خراسان رضوی است. از مناطق دیدنی این روستا آبشار رونج و باغهای سرسبز حاشیه رود و همچنین طبیعت بسیار زیبا و آب و هوای کوهستانی آن است که در بهار و تابستان پذیرای گردشگران است. در این منطقه چندین چشمه و چنار کهنسال نیز وجود دارد که بر جذابیت آن می افزاید.روستای رونج Revenj از زیباترین روستاهای خراسان رضوی در تربت جام است که با آبشار و طبیعت کوهستانی همواره گردشگران زیادی را بخود جلب می کند.',
    impression_agents: [],
    impression_count: null,
    is_valid: true,
    location: {
      area: null,
      city: {
        city_id: null,
        city_name_en: 'test6.958351961692097',
        city_name_fa: 'تربت جام',
        description: null,
        geo_point: {
          lat: null,
          lon: null,
        },
        media_list: [],
        normalized_name_fa: 'تربتجام',
        province: {
          geo_point: {
            lat: null,
            lon: null,
          },
          normalized_province_name_fa: 'خراسانرضوی',
          province_id: null,
          province_name_en: 'Khorasan Razavi',
          province_name_fa: 'خراسان رضوی',
          visited_count: 0,
        },
        visited_count: 0,
      },
      created_at: '2023-03-03 18:25:57.838747',
      geo_point: {
        area: null,
        city: {
          city_id: 19,
          city_name_en: 'test6.958351961692097',
          city_name_fa: 'تربت جام',
          description: null,
          geo_point: {
            lat: null,
            lon: null,
          },
          media_list: [],
          normalized_name_fa: 'تربتجام',
          province: {
            geo_point: {
              lat: null,
              lon: null,
            },
            normalized_province_name_fa: 'خراسانرضوی',
            province_id: null,
            province_name_en: 'Khorasan Razavi',
            province_name_fa: 'خراسان رضوی',
            visited_count: 0,
          },
          visited_count: 0,
        },
        created_at: '2023-03-03 18:25:57.838747',
        geo_point: {
          city: {
            city_name_en: 'test6.958351961692097',
            city_name_fa: 'تربت جام',
            created_at: '2023-02-08T17:07:53.575412+03:30',
            geo_point: {
              lat: 33.46,
              lon: 18.29,
            },
            id: 19,
            normalized_city_name: 'تربتجام',
            province: {
              created_at: '2023-02-08T17:07:53.575372+03:30',
              geo_point: {
                lat: 18.95,
                lon: 25.84,
              },
              id: 10,
              normalized_province_name: 'خراسانرضوی',
              province_name_en: 'Khorasan Razavi',
              province_name_fa: 'خراسان رضوی',
            },
          },
          geo_point: {
            lat: 16.76,
            lon: 31.36,
          },
          location_id: 4497,
        },
        location_id: 4497,
        street: null,
      },
      location_id: 4497,
      street: null,
    },
    media_count: 5,
    media_list: [],
    name_en: 'آبشار رونج تربت جام',
    name_fa: 'آبشار رونج تربت جام',
    normalized_name: 'آبشاررونجتربتجام',
    resort_id: 4497,
    resort_type: 'tourism_entity',
    total_popularity_score: null,
    tourism_entity_id: null,
    tourism_entity_type: 'waterfall',
    visited_count: 0,
  },
]
