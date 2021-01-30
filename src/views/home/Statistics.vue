<template>
    <div class="statistics">
        <Card />
        <LineChart />
    </div>
</template>

<script>
import Card from "@/components/Card.vue";
import LineChart from "@/components/LineChart.vue";

export default {
    name: "Statistics",
    components: {
        Card,
        LineChart
    }
};
</script>
