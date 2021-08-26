<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chart_name"],
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              stacked: false,
              ticks: {
                fontSize: 12,
                fontColor: "rgb(212, 211, 211)",
              },
              gridLines: {
                color: "rgba(212, 211, 211, 0.5)",
              },
              scaleLabel: {
                display: true,
                labelString: "",
                fontColor: "rgb(212, 211, 211)",
                fontSize: 12,
              },
            },
          ],
          yAxes: [
            {
              stacked: false,
              ticks: {
                fontSize: 10,
                // beginAtZero: true,
                fontColor: "rgb(212, 211, 211)",
                // max: 60,
              },
              gridLines: {
                color: "rgba(212, 211, 211, 0.5)",
                zeroLineColor: "rgba(212, 211, 211, 0.5)",
              },
              scaleLabel: {
                display: true,
                labelString: "",
                fontColor: "rgb(212, 211, 211)",
                fontSize: 12,
              },
            },
          ],
        },
        animation: false,
        elements: {
          line: {
            tension: 0,
          },
        },
        title: {
          display: true,
          text: this.chart_name,
          fontSize: 15,
          fontColor: "rgb(212, 211, 211)",
        },
        legend: {
          display: false,
        },
      },
    };
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    
    this.renderChart(this.chartData, this.options);
  },
};
</script>
