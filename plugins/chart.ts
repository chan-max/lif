// plugins/echarts.ts

import * as echarts from "echarts/core"; // 引入 ECharts 核心模块
import {
    CanvasRenderer,
    SVGRenderer,
} from "echarts/renderers"; // 渲染器，Canvas 和 SVG

import {
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    RadarChart,
    MapChart,
    TreeChart,
    TreemapChart,
    GraphChart,
    GaugeChart,
    FunnelChart,
    ParallelChart,
    SankeyChart,
    BoxplotChart,
    CandlestickChart,
    HeatmapChart,
    PictorialBarChart,
    ThemeRiverChart,
    SunburstChart,
    CustomChart,
} from "echarts/charts"; // 所有图表类型

import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    ToolboxComponent,
    VisualMapComponent,
    MarkPointComponent,
    MarkLineComponent,
    MarkAreaComponent,
    TimelineComponent,
    BrushComponent,
    PolarComponent,
    GeoComponent,
    ParallelComponent,
    SingleAxisComponent,
    CalendarComponent,
    GraphicComponent,
    DatasetComponent,
    TransformComponent,
} from "echarts/components"; // 所有组件

import { LabelLayout, UniversalTransition } from "echarts/features"; // 特性模块

export default defineNuxtPlugin(() => {
    echarts.use([
        // 渲染器
        CanvasRenderer,
        SVGRenderer,
        // 图表类型
        BarChart,
        LineChart,
        PieChart,
        ScatterChart,
        RadarChart,
        MapChart,
        TreeChart,
        TreemapChart,
        GraphChart,
        GaugeChart,
        FunnelChart,
        ParallelChart,
        SankeyChart,
        BoxplotChart,
        CandlestickChart,
        HeatmapChart,
        PictorialBarChart,
        ThemeRiverChart,
        SunburstChart,
        CustomChart,

        // 组件
        TitleComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        DataZoomComponent,
        ToolboxComponent,
        VisualMapComponent,
        MarkPointComponent,
        MarkLineComponent,
        MarkAreaComponent,
        TimelineComponent,
        BrushComponent,
        PolarComponent,
        GeoComponent,
        ParallelComponent,
        SingleAxisComponent,
        CalendarComponent,
        GraphicComponent,
        DatasetComponent,
        TransformComponent,

        // 特性
        LabelLayout,
        UniversalTransition,
    ]);
});
