<template>
  <div class="UnitDetails pt-5">
    <div class="container">
      <h2 class="main-heading text-center mb-5">{{ UnitsDash[0].Unit_name }}</h2>
      <div class="dash">
        <div class="row">
          <div class="col-lg-7">
            <div class="card shadow bg-white mb-5">
              <router-link
                :to="{ name: 'Room Details', params: { id: unitId } }"
                class="btn btn-bg btn-primary text-white"
                target="_blank"
                >View Rooms</router-link
              >
            </div>
            <div class="card bg-white shadow">
              <h4><i class="fa fa-table"></i> Latest Shifts</h4>

              <div class="table-card overflow-auto">
                <table class="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Shift</th>
                      <th scope="col">Details</th>
                      <th scope="col" v-if="user.Role_id == 19">Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(shift, i) in UnitsDash" :key="shift.id">
                      <th scope="row">{{ i + 1 }}</th>
                      <td>{{ shift.Shift_date.substr(0, 10) }}</td>
                      <td>{{ shift.Shift }}</td>
                      <td>
                        <router-link
                          :to="{ name: 'Shift Details', params: { id: shift.id } }"
                          class="btn btn-sm btn-primary"
                          >Details</router-link
                        >
                      </td>
                      <td v-if="user.Role_id == 19">
                        <router-link
                          :to="'/editShiftDetials/' + shift.id"
                          class="fa fa-edit bg-success text-white btn-sm btn"
                        ></router-link>
                        <i
                          class="fa fa-trash bg-danger text-white btn-sm btn"
                          style="cursor: pointer"
                          @click.prevent="deleteShift(shift.id, true)"
                        ></i>
                      </td>
                      <td
                        v-else-if="
                          UnitDash.filter((x) => x.Unit_id == unitId).length > 0 &&
                          user.Role_id == 17
                        "
                      >
                        <span
                          v-if="
                            shift.Shift_date.substr(0, 10).trim() ==
                              UnitDash[0].Shift_date.substr(0, 10).trim() &&
                            shift.Shift.trim() == UnitDash[0].Shift.trim()
                          "
                        >
                          <router-link
                            :to="'/editShiftDetials/' + shift.id"
                            class="fa fa-edit bg-success text-white btn-sm btn"
                          ></router-link>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="card bg-white shadow">
              <h4><i class="fa fa-bar-chart"></i> Statistics data for current shift.</h4>
              <div class="my-chart"><canvas id="myData"></canvas></div>
            </div>

            <div class="card bg-white shadow mt-5 p-3">
              <ul class="list-unstyled">
                <li class="cu-flex">
                  <span>Received</span>
                  <span class="badge badge-info">{{ todayData.Received }}</span>
                </li>
                <li class="cu-flex">
                  <span>Admission</span>
                  <span class="badge badge-warning">{{ todayData.Admission }}</span>
                </li>
                <li class="cu-flex">
                  <span>Transfer In</span>
                  <span class="badge badge-success">{{ todayData.Transfer_In }}</span>
                </li>
                <li class="cu-flex">
                  <span>Transfer Out</span>
                  <span class="badge badge-danger">{{ todayData.Transfer_Out }}</span>
                </li>
                <li class="cu-flex">
                  <span>Total Census</span>
                  <span class="badge badge-primary">{{ todayData.Total_Census }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitDetails",
  props: ["link", "user", "edits", "UnitDash"],
  data() {
    return {
      UnitsDash: [],
      unitId: this.$route.params.id,
      todayData: {
        Received: 0,
        Admission: 0,
        Transfer_In: 0,
        Transfer_Out: 0,
        Total_Census: 0,
      },
      apiUrl: this.link,
    };
  },
  methods: {
    deleteShift: function (id, hide) {
      let that = this;
      swal({
        title: "Are you sure?",
        buttons: true,
      }).then((confirm) => {
        if (confirm) {
          $.ajax({
            type: "POST",
            url: that.apiUrl + "endoresment/UnitDetails.aspx/deletedShift",
            data: JSON.stringify({ detail: { id: id, Hide: hide } }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
              swal({
                title: "Sweet!",
                text: "You have successfully deleted the shift ...",
                icon: "success",
                dangerMode: true,
              });
              location.reload();
            },
          });
        }
      });
    },
  },
  created() {
    let that = this;

    //get Units dahsboard
    $.ajax({
      type: "POST",
      url: that.apiUrl + "endoresment/UnitDetails.aspx/getUnitsDashData",
      data: JSON.stringify({ id: { U_id: that.unitId } }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        that.UnitsDash = JSON.parse(data.d).filter((x) => {
          let checkDate = x.Shift_date.substr(0, 10);

          let time =
            x.Shift.trim() == "Day"
              ? moment(moment(checkDate).format("YYYY-MM-DD") + " 8:00")
              : moment(moment(checkDate).format("YYYY-MM-DD") + " 20:00");
          console.log(time.format());
          return time <= moment(new Date());
        });
        that.UnitsDash.map((x) => {
          let checkDate = x.Shift_date.substr(0, 10);
          if (new Date().getHours() < 20 && new Date().getHours() >= 8) {
            if (
              moment(checkDate).format("YYYY-MM-DD") ==
              moment(new Date()).format("YYYY-MM-DD")
            ) {
              that.todayData = x;
            }
          } else {
            if (
              checkDate == moment(new Date()).format("YYYY-MM-DD") &&
              new Date().getHours() < 24
            ) {
              that.todayData = x;
            } else if (
              checkDate == moment(new Date() - 1000 * 24 * 60 * 60).format("YYYY-MM-DD")
            ) {
              that.todayData = x;
            }
          }
        });
      },
      complete: function () {
        $(document).ready(function () {
          var ctx = document.getElementById("myData").getContext("2d");
          var myChart = new Chart(ctx, {
            type: "pie",
            data: {
              labels: ["Received", "Admission", "Transfer In", "Transfer Out"],
              datasets: [
                {
                  data: [
                    that.todayData.Received,
                    that.todayData.Admission,
                    that.todayData.Transfer_In,
                    that.todayData.Transfer_Out,
                  ],
                  backgroundColor: ["#17a2b8", "#ffc107", "#29b770", "#dc3545"],
                },
              ],
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            },
          });
        });
      },
    });

    setTimeout(function () {
      if (that.UnitDash.filter((x) => x.Unit_id == that.unitId).length > 0) {
        that.UnitDash = that.UnitDash.filter((x) => x.Unit_id == that.unitId);
        that.UnitDash.map(
          (z) => (z.Shift_date = moment(z.Shift_date).format("YYYY-MM-DD"))
        );
      }
    }, 1000);
  },
};
</script>

<style scoped>
.UnitDetails {
  min-height: 100vh;
  background-color: #f6f8fb;
  padding-bottom: 60px;
}
.UnitDetails .main-heading {
  background: url("../../assets/layout/img/border2.png") bottom center no-repeat;
  background-size: contain;
  padding-bottom: 20px;
  max-width: 300px;
  margin: auto;
  font-size: 24px;
}
.UnitDetails .dash .card .table-card {
  height: 300px;
  font-size: 16px;
}
thead {
  box-shadow: 0 0 10px 10px #e1e1e1;
}
.UnitDetails .dash .card h4 {
  font-size: 22px;
  padding: 15px;
}
.UnitDetails .dash .card h4 i {
  margin-right: 5px;
}
.UnitDetails .dash .card li {
  padding: 10px;
}
.UnitDetails .dash .card li:nth-of-type(odd) {
  background-color: #f7f7f7;
  border-radius: 5px;
}
.UnitDetails .dash .card li .badge {
  width: 50px;
  line-height: 1.5;
}
</style>
