<template>
  <div class="viewPatients" v-if="DoctorData">
    <!-- shifts for resident doctor -->
    <div
      class="endoresment-options pt-3 text-center border rounded"
      v-if="DoctorData.Type.trim() == 'Resident'"
    >
      <div class="row align-items-center border-bottom border-white pt-3 pb-3">
        <div class="col-md-6">
          Current Shift
          <span class="text-primary"
            ><i :class="Shift == 'Day' ? 'fa fa-sun-o' : 'fa fa-moon-o'"></i>
            {{ Shift }}</span
          >
        </div>
        <div class="col-md-6">
          <div class="receive-shift" v-if="Shifts.length == 0">
            <button
              v-if="unConfirmedShifts.length == 0"
              type="button"
              class="btn btn-primary btn-block shadow"
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              Receive Shift
            </button>

            <button
              v-else
              type="button"
              class="btn btn-success btn-block shadow"
              data-toggle="modal"
              data-target="#exampleModal3"
              @click.prevent="confirmShift = unConfirmedShifts[0]"
            >
              Confirm receiving shift
            </button>
          </div>

          <p class="text-success" v-else-if="Shifts[0].Completed">
            <i class="fa fa-check-circle pr-1"></i> You handoverd current shift!
          </p>

          <button
            v-else
            type="button"
            class="btn btn-danger btn-block shadow"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Handover Shift
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="pt-5 pb-3 border-bottom mainColor">
        <i class="ml-3 mr-3 fa fa-hospital-o"></i>
        {{ DoctorData.Spcy_Description }} patients list
      </h1>

      <div class="row" v-if="DoctorPatients.length > 0">
        <div class="col-md-4" v-for="patient in DoctorPatients" :key="patient.id">
          <div class="details">
            <div class="inner shadow">
              <h3 class="pb-2">
                {{ patient.Patient_FullName }}
                <span
                  :class="patient.Gender.trim() == 'Male' ? 'text-primary' : 'text-pink'"
                >
                  <i
                    :class="
                      patient.Gender.trim() == 'Male' ? 'fa fa-male' : 'fa fa-female'
                    "
                  ></i>
                </span>
              </h3>
              <span class="age badge badge-light border font-weight-normal">
                Age: <span class="text-danger">{{ patient.Age }} </span></span
              >
              <span
                class="speciality badge font-weight-normal"
                v-if="DoctorData.Type == 'Consultant'"
              >
                {{ patient.Consultant_id == user.Emp_id ? "Primary" : "Consultation" }}
              </span>
              <span class="speciality badge font-weight-normal" v-else>
                {{
                  patient.Specialty.trim() == DoctorData.Spcy_Description.trim()
                    ? "Primary"
                    : "Consultation"
                }}
              </span>
              <div class="row mt-3 p-2 border rounded place">
                <div class="col-6 border-right">
                  <span>Unit:</span> {{ patient.Unit }}
                </div>
                <div class="col-6"><span>Room:</span> {{ patient.Room }}</div>
              </div>
              <p class="medicalNum mt-3">
                <span>Medical Number:</span>
                {{ patient.Medical_Number }}
              </p>

              <div class="text-right">
                <router-link
                  :to="{ name: 'Patient Data', params: { id: patient.id } }"
                  class="btn"
                  >View Details</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card text-center" v-else>
        <p class="mt-3 alert">
          <i class="fa fa-warning text-warning"></i> You have no patients yet!
        </p>
      </div>
    </div>

    <!-- popup endorsing-nurse-->
    <div class="endorsing-doctor">
      <!-- receive shift -->
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel2">Receive Shift</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="newShift">
                <div class="custom-form">
                  <div class="cu-field">
                    <h3 class="cu-label">
                      <label>Receive From :</label>
                    </h3>
                    <div class="f-select">
                      <select
                        class="form-control form-control-sm"
                        required
                        v-model="newShift.Receive_from"
                      >
                        <option value="">...</option>
                        <option
                          v-for="doctor in Doctors"
                          :value="doctor.Dr_Code"
                          :key="doctor.Dr_Code"
                        >
                          {{ doctor.DR_Name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="cu-field">
                    <h3 class="cu-label">
                      <label>Shift Date :</label>
                    </h3>
                    <div class="cu-input text-box">
                      <span class="fa fa-calendar-o"></span>
                      <input
                        :max="today"
                        type="date"
                        required
                        v-model="newShift.Shift_date"
                      />
                    </div>
                  </div>
                  <div class="cu-field radio-group">
                    <div class="row align-items-end">
                      <div class="col-md-6">
                        <div class="cu-field">
                          <h3 class="cu-label">
                            <label>Current Shift:</label>
                          </h3>
                          <input
                            id="select3"
                            type="radio"
                            name="shift"
                            value="Day"
                            v-model="newShift.Shift"
                            required
                          />
                          <label for="select3">
                            <div class="cu-input cu-radio normal">
                              <div class="contain">
                                <span class="fa fa-check"></span>
                                <div>Day</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="cu-field">
                          <input
                            id="select4"
                            type="radio"
                            name="shift"
                            value="Night"
                            v-model="newShift.Shift"
                            required
                          />
                          <label for="select4">
                            <div class="cu-input cu-radio normal">
                              <div class="contain">
                                <span class="fa fa-check"></span>
                                <div>Night</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary shadow" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary shadow" @click="insertShift()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- handover shift -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Handover Shift</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="custom-form">
                  <div class="cu-field">
                    <h3 class="cu-label">
                      <label>Handover To :</label>
                    </h3>
                    <div class="f-select">
                      <select
                        class="form-control form-control-sm"
                        required
                        v-model="newShift.Doctor_id"
                      >
                        <option value="">...</option>
                        <option
                          v-for="doctor in Doctors"
                          :value="doctor.Dr_Code"
                          :key="doctor.Dr_Code"
                        >
                          {{ doctor.DR_Name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="cu-field">
                    <h3 class="cu-label">
                      <label>Shift Date :</label>
                    </h3>
                    <div class="cu-input text-box">
                      <span class="fa fa-calendar-o"></span>
                      <input
                        :max="today"
                        type="date"
                        required
                        v-model="newShift.Shift_date"
                      />
                    </div>
                  </div>
                  <div class="cu-field radio-group">
                    <div class="row align-items-end">
                      <div class="col-md-6">
                        <div class="cu-field">
                          <h3 class="cu-label">
                            <label>Current Shift:</label>
                          </h3>
                          <input
                            id="select1"
                            type="radio"
                            name="handShift"
                            value="Day"
                            v-model="newShift.Shift"
                            required
                          />
                          <label for="select1">
                            <div class="cu-input cu-radio normal">
                              <div class="contain">
                                <span class="fa fa-check"></span>
                                <div>Day</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="cu-field">
                          <input
                            id="select2"
                            type="radio"
                            name="handShift"
                            value="Night"
                            v-model="newShift.Shift"
                            required
                          />
                          <label for="select2">
                            <div class="cu-input cu-radio normal">
                              <div class="contain">
                                <span class="fa fa-check"></span>
                                <div>Night</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary shadow" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary shadow" @click="insertShift()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- confirm receiving shift -->
      <div
        v-if="confirmShift"
        class="modal fade"
        id="exampleModal3"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel3"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Confirm receiving shift</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="shift-info list-unstyled">
                <li class="border-bottom p-3 cu-flex">
                  <span class="keyWords text-primary">Receiving From:</span>
                  <span class="values">{{ confirmShift.Receive_name }}</span>
                </li>
                <li class="border-bottom p-3 cu-flex">
                  <span class="keyWords text-primary">Shift Date:</span>
                  <span class="values">{{ confirmShift.Shift_date.substr(0, 10) }}</span>
                </li>
                <li class="p-3 cu-flex">
                  <span class="keyWords text-primary">Shift:</span>
                  <span class="values">
                    {{ confirmShift.Shift }}
                    <span class="text-success"
                      ><i
                        :class="
                          confirmShift.Shift.trim() == 'Day'
                            ? 'fa fa-sun-o'
                            : 'fa fa-moon-o'
                        "
                      ></i
                    ></span>
                  </span>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary shadow" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-success shadow" @click="confirm()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewPatients",
  props: ["link", "user", "DoctorPatients"],
  data() {
    return {
      DoctorData: null,
      Doctors: [],
      patients: [],
      Shifts: [],
      unConfirmedShifts: [],
      Shift: "",
      today: "",
      newShift: {
        Doctor_id: 0,
        Doctor_name: "",
        Receive_from: 0,
        Receive_name: "",
        Shift: "",
        Shift_date: "",
        Confirm: 1,
        Entry_user: 0,
      },
      confirmShift: null,
      apiUrl: this.link,
    };
  },
  methods: {
    insertShift() {
      if ($(".modal.show form").is(":valid")) {
        let that = this,
          handover = false;
        that.newShift.Entry_user = that.user.Emp_id;
        that.newShift.Spcy_id = that.DoctorData.Spcy_id;

        // if it's receive shift
        if (!that.newShift.Doctor_id) {
          that.newShift.Doctor_id = that.user.Emp_id;
          that.newShift.Doctor_name = that.user.FullName;
          that.newShift.Receive_name = that.Doctors.filter(
            (x) => x.Dr_Code == that.newShift.Receive_from
          )[0].DR_Name;
          that.newShift.Confirm = 1;
        }
        // if it's handover
        else {
          handover = true;
          that.newShift.Receive_from = that.user.Emp_id;
          that.newShift.Receive_name = that.user.FullName;
          that.newShift.Doctor_name = that.Doctors.filter(
            (x) => x.Dr_Code == that.newShift.Doctor_id
          )[0].DR_Name;
          that.newShift.Confirm = 0;
        }
        let stored = Object.assign({}, that.newShift);

        // insert into database new shift
        $.ajax({
          type: "POST",
          url: that.apiUrl + "endoresment/viewPatients.aspx/newDoctorShift",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({ shift: that.newShift }),
          dataType: "json",
          beforeSend: function () {
            swal({
              title: "Sending!",
              text: "Please wait!",
              buttons: false,
              closeOnClickOutside: false,
            });
          },
          success: function (data) {
            if (!handover) {
              stored.id = JSON.parse(data.d);
              that.Shifts.push(stored);
            } else {
              let handedShift = that.Shifts[0].id;
              resend();

              function resend() {
                return $.ajax({
                  type: "POST",
                  url: that.apiUrl + "endoresment/viewPatients.aspx/completeDoctorShift",
                  data: JSON.stringify({ shift: { id: handedShift } }),
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  error: function () {
                    resend();
                  },
                });
              }
              that.Shifts.filter((x) => x.id == handedShift)[0].Completed = 1;
            }
          },
          complete: function () {
            swal({
              title: "Done!",
              text: `You successfully ${handover ? "handed" : "received"} a shift!`,
              icon: "success",
            }).then((x) => {
              $(".modal").modal("hide");
              Object.keys(that.newShift).map((x) => (that.newShift[x] = null));
            });
          },
        });
      } else {
        swal({
          icon: "warning",
          dangerMode: true,
          text: "Please Fill All Fields!",
        });
      }
    },
    confirm() {
      let that = this;
      if (that.confirmShift.Shift.trim() == "Day") {
        if (new Date().getHours() < 20 && new Date().getHours() >= 8) {
          $.ajax({
            type: "POST",
            url: that.apiUrl + "endoresment/viewPatients.aspx/confirmShift",
            data: JSON.stringify({ shift: { id: that.confirmShift.id } }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              that.unConfirmedShifts = that.unConfirmedShifts.filter(
                (x) => x.id != that.confirmShift.id
              );
              that.confirmShift.Confirm = 1;
              that.Shifts.push(that.confirmShift);

              swal({
                title: "Done!",
                text: `You confirmed receiving a shift!`,
                icon: "success",
              }).then((x) => {
                $(".modal").modal("hide");
              });
            },
          });
        } else {
          swal({
            title: "Oops!",
            text: `You can not receive this shift unless it's past 8:00 AM`,
            icon: "warning",
            dangerMode: true,
          });
        }
      } else {
        if (new Date().getHours() >= 20 || new Date().getHours() < 8) {
          $.ajax({
            type: "POST",
            url: that.apiUrl + "endoresment/viewPatients.aspx/confirmShift",
            data: JSON.stringify({ shift: { id: that.confirmShift.id } }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              that.unConfirmedShifts = that.unConfirmedShifts.filter(
                (x) => x.id != that.confirmShift.id
              );
              that.confirmShift.Confirm = 1;
              that.Shifts.push(that.confirmShift);

              swal({
                title: "Done!",
                text: `You confirmed receiving a shift!`,
                icon: "success",
              }).then((x) => {
                $(".modal").modal("hide");
              });
            },
          });
        } else {
          swal({
            title: "Oops!",
            text: `You can not receive this shift unless it's past 8:00 PM`,
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    },
  },
  created() {
    let that = this;

    that.today = moment(new Date()).format("YYYY-MM-DD");

    //get doctor data
    $.ajax({
      type: "POST",
      url: that.apiUrl + "endoresment/viewPatients.aspx/getDoctorData",
      data: JSON.stringify({ data: { Dr_Code: that.user.Emp_id } }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        that.DoctorData = JSON.parse(data.d)[0];

        //get Patients
        if (that.DoctorData.Type == "Consultant") {
          $.ajax({
            type: "POST",
            url: that.apiUrl + "endoresment/viewPatients.aspx/getPatientsData",
            data: JSON.stringify({ data: { Dr_Code: that.user.Emp_id } }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              that.patients.push(JSON.parse(data.d)[0]);
            },
          });
        } else {

          // get doctors
          $.ajax({
            type: "POST",
            url: that.apiUrl + "endoresment/viewPatients.aspx/getDoctorsData",
            data: JSON.stringify({
              data: { Spcy_Description: that.DoctorData.Spcy_Description },
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
              that.Doctors = JSON.parse(data.d);
            },
          });
        }
      },
    });

    // getShiftsData
    $.ajax({
      type: "POST",
      url: that.apiUrl + "endoresment/viewPatients.aspx/getShiftsData",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ data: { Dr_Code: that.user.Emp_id } }),
      dataType: "json",
      success: function (data) {
        that.Shifts = JSON.parse(data.d);
        that.unConfirmedShifts = that.Shifts.filter((x) => x.Confirm == 0);
        if (new Date().getHours() <= 20 && new Date().getHours() >= 8) {
          that.Shift = "Day";
          that.Shifts = that.Shifts.filter(
            (x) =>
              x.Shift_date.trim().substr(0,10) ==
                moment(new Date()).format("DD/MM/YYYY") && x.Shift.trim() == "Day"
          );
        } else {
          that.Shift = "Night";
          that.Shifts = that.Shifts.filter((x) => x.Shift.trim() == "Night");
        }
      },
    });
  },
};
</script>

<style scoped>
.viewPatients {
  min-height: 100vh;
  background-color: #f6f8fb;
  background: #fff url("../../assets/layout/img/backgrounds/bg20.png") top no-repeat;
  background-size: contain;
}
.endoresment-options {
  background-color: #e9edfb;
}
.endoresment-options .row:last-of-type {
  border-bottom: none !important;
}
.endoresment-options .btn {
  padding: 15px 0;
  max-width: 300px;
  margin: 15px auto;
  font-size: 18px;
}
.viewPatients .details {
  max-width: 300px;
  margin: 20px auto;
  background-color: #baf2b1;
}
.viewPatients .details .inner {
  background-color: #fff;
  padding: 20px;
  position: relative;
  padding: 29px;
  margin: auto;
  border-radius: 5px;
}
.viewPatients .details .inner h3 {
  color: #046132;
  font-size: 19px;
}
.viewPatients .details .inner h3 {
  color: #046132;
  font-size: 19px;
}
.viewPatients .details .inner h3 span {
  font-size: 14px;
  color: #aaa;
}
.viewPatients .details .inner h3 span.text-pink {
  color: #ff4646;
}
.viewPatients .details .inner .speciality {
  position: absolute;
  top: 13px;
  right: 5px;
  font-size: 16px;
  color: #046132;
  background-color: #e2fbde;
}
.viewPatients .details .inner .age {
  font-size: 16px;
}
.viewPatients .details .inner .place {
  font-size: 14px;
}
.viewPatients .details .inner .place span {
  margin-right: 10px;
}
.viewPatients .details .inner .btn {
  box-shadow: 2px 2px 2px #ccc, 5px 5px 15px inset #ccc;
}
.endorsing-doctor .modal {
  padding-top: 120px;
}
.endorsing-doctor .modal .custom-form {
  border: none;
}
.endorsing-doctor .modal .custom-form .cu-label {
  font-size: 16px;
}
.internal-page .f-select::before {
  top: calc(50% + 0px);
}
.custom-form .cu-form-group .cu-field {
  padding: 5px 0;
}
.custom-form .cu-form-group .cu-field .cu-input,
.custom-form .cu-form-group .cu-field .f-select {
  max-width: 500px;
}
.custom-form .cu-field .cu-input.text-box {
  margin-inline-end: 0px;
}
</style>
