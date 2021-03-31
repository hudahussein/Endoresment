import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";

import addUnit from "@/components/endoresment/addUnit";
import Units from "@/components/endoresment/Units";
import addPatient from "@/components/endoresment/add_patient";
import viewPatients from "@/components/endoresment/patients_doctor";
import patientsNurse from "@/components/endoresment/patients_nurse";
import UnitDetails from "@/components/endoresment/UnitDetails";
import shiftDetails from "@/components/endoresment/shiftDetails";
import editShiftDetials from "@/components/endoresment/editShiftDetials";
import insertPatientData from "@/components/endoresment/insertPatientData";
import roomDetails from "@/components/endoresment/roomDetails";
import patientData from "@/components/endoresment/patientData";
import or_patient from "@/components/endoresment/or_patient";
import or_patient_edit from "@/components/endoresment/or_patient_edit";
import OR from "@/components/endoresment/OR";
import OR_details from "@/components/endoresment/OR_details";
import selectUnit from "@/components/endoresment/selectUnit";
import Handover from "@/components/endoresment/Handover";
import Nurses from "@/components/endoresment/Nurses";
import editNurses from "@/components/endoresment/editNurses";
import editPatients from "@/components/endoresment/editPatients";
import nursesPdf from "@/components/endoresment/nursesPdf";
import Nursing_schedule from "@/components/endoresment/Nursing_schedule";
import display_schdule from "@/components/endoresment/display_schdule";
import doctorInfo from "@/components/endoresment/doctorInfo";

Vue.use(Router);

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: "/login",
      name: "login",
      component: login,
      meta: {},
    },
    {
      path: "/",
      name: "Dashboard",
      component: Handover,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/Charge",
      name: "Charge Nurse Endorsing",
      component: addUnit,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: true,
      },
    },
    {
      path: "/Units",
      name: "Units",
      component: Units,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: true,
      },
    },
    {
      path: "/selectUnit",
      name: "Rooms",
      component: selectUnit,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/UnitDetails/:id",
      name: "Unit Details",
      component: UnitDetails,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/ShiftDetails/:id",
      name: "Shift Details",
      component: shiftDetails,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/editShiftDetials/:id",
      name: "Edit Shift Details",
      component: editShiftDetials,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: true,
      },
    },
    {
      path: "/addmition",
      name: "Admission Form",
      component: addPatient,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/viewPatients",
      name: "Doctors Patients",
      component: viewPatients,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/patientsNurse",
      name: "Nurses Patients",
      component: patientsNurse,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/patientData/:id",
      name: "Patient Data",
      component: patientData,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/insertPatientData/:id",
      name: "Insert Patient Data",
      component: insertPatientData,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/roomDetails/:id",
      name: "Room Details",
      component: roomDetails,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/or_patient_edit:id",
      name: "Edit Procedure",
      component: or_patient_edit,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/nursesPdf/:id",
      name: "Nurses Pdf",
      component: nursesPdf,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/Nursing_schedule",
      name: "Nursing Schedule",
      component: Nursing_schedule,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: true,
      },
    },

    {
      path: "/display_schdule",
      name: "Display Nurses Schdule",
      component: display_schdule,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: true,
      },
    },

    {
      path: "/doctorInfo",
      name: "Doctors Info",
      component: doctorInfo,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: true,
      },
    },
    {
      path: "/or_patient",
      name: "Schedule Procedure",
      component: or_patient,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/OR",
      name: "OR",
      component: OR,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: true,
        chargeNurse: false,
      },
    },
    {
      path: "/OR_details:id",
      name: "OR Details",
      component: OR_details,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/Nurses/:id",
      name: "Nurses",
      component: Nurses,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/editNurses/:id",
      name: "Edit Nurses",
      component: editNurses,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    },
    {
      path: "/editPatients/:id",
      name: "Edit Patients",
      component: editPatients,
      meta: {
        requiresAuth: true,
        cat: "Endoresment",
        viewMenu: false,
        chargeNurse: false,
      },
    }
  ],
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = localStorage.getItem("user");
    if (user) {
      // user signed in, proceed to route
      if (to.matched.some((rec) => rec.meta.requiresAuth)) {
      }
      next();
    } else {
      // no user signed in, redirect to login
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
