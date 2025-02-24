import { ref, type Ref } from 'vue';

export function usePromise<T, Args extends any[]>(promiseFn: (...args: Args) => Promise<T>, options?: Record<string, any>) {
    const data: Ref<T | null> = ref(null); // 存储结果数据
    const loading: Ref<boolean> = ref(false); // 是否处于加载中
    const error: Ref<Error | null> = ref(null); // 存储错误信息
    const params: Ref<Args | null> = ref(null); // 存储传入的参数

    const init = (...args: Args): void => {
        loading.value = true;
        error.value = null;
        params.value = args;
        promiseFn(...args)
            .then((result) => {

                if (options?.onResolve) {
                    result = options.onResolve(result)
                }

                data.value = result;
            })
            .catch((err) => {
                error.value = err instanceof Error ? err : new Error(String(err));
                loading.value = false;
            })
            .finally(() => {
                loading.value = false;
            });
    };

    return {
        data,
        loading,
        error,
        init,
        params,
    };
}

/* 使用示例：
import { usePromise } from './usePromise';

const { data, loading, error, init, params } = usePromise(async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
});

// 触发 Promise 方法
init(1); // 加载 id 为 1 的数据
console.log(params.value); // 输出: [1]
*/