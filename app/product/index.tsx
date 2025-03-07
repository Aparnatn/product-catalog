
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

type product = {
  id: number
  title: string
  body: string
}

function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Array<product>> => {
      const response = await fetch('https://fakestoreapi.com/products')
      return await response.json()
    },
  })
}

function Products({
  setProductId,
}: {
  setProductId: React.Dispatch<React.SetStateAction<number>>
}) {
  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = useProducts()

  return (
    <div>
      <h1>Products</h1>
      <div>
        {status === 'pending' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((product) => (
                <p key={product.id}>
                  <a
                    onClick={() => setProductId(product.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(['Product', product.id])
                        ? {
                            fontWeight: 'bold',
                            color: 'green',
                          }
                        : {}
                    }
                  >
                    {product.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}

const getProductById = async (id: number): Promise<product> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/Products/${id}`,
  )
  return await response.json()
}

function useProduct(productId: number) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  })
}

function Post({
  postId,
  setPostId,
}: {
  postId: number
  setPostId: React.Dispatch<React.SetStateAction<number>>
}) {
  const { status, data, error, isFetching } = useProduct(postId)

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  )
}

function App() {
  const [productId, setProductId] = React.useState(-1)

  return (
    
    <main></main>
  )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)
