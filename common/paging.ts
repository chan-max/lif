import { ref, toRaw, watch } from "vue";

export const usePagination = (fetchApi: any, params?: any) => {
    const { preprocessParams, defaultCurrentPage } = params || {};

    // 数据状态
    const list = ref([]); // 所有数据
    const currentPage = ref(defaultCurrentPage || 1); // 当前页码
    const pageSize = ref(5); // 每页大小
    const total = ref(0); // 数据总量

    // 状态管理
    const loading = ref(false); // 是否正在加载
    const isEmpty = ref(false); // 是否为空数据
    const isLastPage = ref(false); // 是否最后一页
    const canLoadMore = ref(false); // 是否可以继续加载

    // 加载指定页数据
    const loadPage = async (page: number) => {
        if (loading.value) return; // 防止重复加载

        loading.value = true;
        try {
            // 调用参数预处理钩子，动态生成请求参数
            const params = preprocessParams
                ? preprocessParams({ currentPage: page, pageSize: pageSize.value })
                : { currentPage: page, pageSize: pageSize.value };

            const { data } = await fetchApi(params);
            const response = toRaw(data);

            const { list: newList, total: newTotal } = response;


            // 更新数据状态
            list.value = newList || [];
            total.value = newTotal || 0;

            // 更新状态管理
            isEmpty.value = list.value.length === 0;
            isLastPage.value = page * pageSize.value >= total.value; // 当前页是否是最后一页
            canLoadMore.value = !isLastPage.value; // 是否可以继续加载
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loading.value = false;
        }
    };

    // 加载当前页（下一页）
    const getList = async () => {
        await loadPage(currentPage.value);
    };

    // 重置分页（用于重新加载）
    const resetPagination = () => {
        list.value = [];
        currentPage.value = defaultCurrentPage || 1;
        total.value = 0;
        isEmpty.value = false;
        isLastPage.value = false;
        canLoadMore.value = false;
    };

    // 监听 currentPage 的变化，动态加载对应页数据
    watch(currentPage, async (newPage) => {
        await loadPage(newPage);
    });

    return {
        list, // 数据列表
        total, // 总结果数量
        loading, // 是否正在加载
        isEmpty, // 是否为空数据
        isLastPage, // 是否为最后一页
        canLoadMore, // 是否可以继续加载
        getList, // 加载当前页数据
        resetPagination, // 重置分页
        pageSize, // 每页数量
        currentPage, // 当前页码（响应式）
    };
};
