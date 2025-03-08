const questions = [
  {
    id: 1,
    type: "yesno",
    text: "Modification to an already cleared / licensed device?",
    subheading: "Intent to market a device",
    yes: 3,
    no: 2,
  },
  {
    id: 2,
    type: "info",
    text: "Refer to Market Authorization and Establishment Registration Procedure",
    next: null,
  },
  {
    id: 3,
    type: "yesno",
    text: "Is Detailed Regulatory Assessment deemed necessary (DRA)? (DRA is separate assessment process / form)",
    subheading: "Conduct an Initial Assessment",
    yes: 5,
    no: 4,
  },
  {
    id: 4,
    type: "info",
    text: "Document the rationale for not requiring DRA",
    next: null,
  },
  {
    id: 5,
    type: "yesno",
    text: "Deemed to impact safety or efficacy?",
    subheading: "Complete DRA Form (Refer to DOC-00001)",
    yes:6,
    no:9,
  },
  {
    id: 6,
    type: "info",
    text: "Identify regulatory action per the appropriate jurisdictions where Company markets products",
    next:7,
  },
  {
    id: 7,
    type: "info",
    text: "Obtain market authorization for the modified device through a new 510(k)",
    next: 8,
  },
  {
    id: 8,
    type: "info",
    text: "Commence Product Sale",
  },
  {
    id: 9,
    type: "yesno",
    pointer:"1.2",
    text: "Labelling change ?",
    yes:10,
    no:27,
  },
  {
    id: 10,
    type: "yesno",
    pointer:"A1",
    text: "Is it a change in the indications for use statement ?",
    yes:12,
    no:14,
  },
  /*{
    id: 11,
    type: "yesno",
    text: "A2 Does the change add or delete a contraindication ?",
    yes:null,
    no:null,
  },*/
  {
    id: 12,
    type: "yesno",
    pointer:"A1.1",
    text: "Is it a change from a device labeled for single use only to a device labeled as reusable ?",
    yes:13,
    no:21,
  },
  {
    id: 13,
    type: "info",
    text: "A new 510(k) is likely required.",
    next:null,
  },
  {
    id: 14,
    type: "yesno",
    pointer:"A2",
    text: "A2 Does the change add or delete a contraindication ?",
    yes:25,
    no:15,
  },
  {
    id: 15,
    type: "yesno",
    pointer:"A3",
    text: "Is it a change in the waring or precautions ?",
    yes:12,
    no:16,
  },
  {
    id: 16,
    type: "yesno",
    pointer:"A4",
    text: "Could it affect the directions for use ?",
    yes:12,
    no:17,
  },
  {
    id: 17,
    type: "info",
    text: "Document to file",
    next:18
  },
  {
    id: 18,
    type: "yesno",
    pointer:"A5",
    text: ["(a) Is an update being made to labelling that will require a GUDID submission?",
        "(b) Is a non-labelling update to GUDID-applicable data being made? (See FDA website for latest “GDDID” Data Elements Reference Table)"],
    yes:19,
    no:20,
  },
  {
    id: 19,
    type: "info",
    text: "FDA’s GUDID database must be updated",
    next: null,
  },
  {
    id: 20,
    type: "info",
    text: "No Change to FDA’s GUDID database required",
    next: null,
  },
  {
    id: 21,
    type: "yesno",
    pointer:"A1.2",
    text: "Is it a change from fix to over the counter OTC use",
    yes:13,
    no:22,
  },
  {
    id: 22,
    type: "yesno",
    pointer:"A1.3",
    text: "Is it a change to the device name or to solely improve readability or clarity ?",
    yes:23,
    no:24,
  },
  {
    id: 23,
    type: "info",
    text: "Document to file",
    next: null,
  },
  {
    id: 24,
    type: "yesno",
    pointer:"A1.4",
    text: "Does the change describe a new disease condition, or pt pop that the device is intended in diagnosing, treating, preventing, curing or mitigating ?",
    yes:25,
    no:26,
  },
  {
    id: 25,
    type: "info",
    text: "New 510(k) (If only adding a contraindication, submit CBE 510(k))",
    next: null,
  },
  {
    id: 26,
    type: "yesno",
    pointer:"A1.5",
    text: "Does a risk-based assessment identify any new risks or significantly modified existing risks ?",
    yes:25,
    no:23,
  },
  {
    id: 27,
    type: "yesno",
    pointer:"1.3",
    text: "Technology, Engineering or Performance change ?",
    yes:28,
    no:42,
  },
  {
    id: 28,
    type: "yesno",
    pointer:"B1",
    text: "Is the device an IVD ?",
    yes:29,
    no:30,
  },
  {
    id: 29,
    type: "info",
    text: "Follow IVDR specific Process",
    next: null,
  },
  {
    id: 30,
    type: "yesno",
    pointer:"B2",
    text: "Is it control mechanism, operating principle, or energy type change ?",
    yes:13,
    no:31,
  },
  {
    id: 31,
    type: "yesno",
    pointer:"B3",
    text: "Is it a change in sterilization, cleaning or disinfection ?",
    yes:32,
    no:34,
  },
  {
    id: 32,
    type: "yesno",
    pointer:"B3.1",
    text: "Is it a change to Cat.B or novel method, does it lower the SAL, or is it a change to how the device is provided?",
    yes:13,
    no:33,
  },
  {
    id: 33,
    type: "yesno",
    pointer:"B3.2",
    text: "B3.2 Could the change significantly affect performance/biocompatibility?",
    yes:13,
    no:23,
  },
  {
    id: 34,
    type: "yesno",
    pointer:"B4",
    text: "Is there a change packaging or expiration dating ?",
    yes:35,
    no:36,
  },
  {
    id: 35,
    type: "yesno",
    pointer:"B4.1",
    text: "Is it same method or protocol, describe in previous 510(k), used to support change ?",
    yes:23,
    no:13,
  },
  {
    id: 36,
    type: "yesno",
    pointer:"B5",
    text: "Is it any other change in design (e.g.,dimensions, performance specifications, components or accessories, patient/User Interface)?",
    yes:37,
    no:23,
  },
  {
    id: 37,
    type: "yesno",
    pointer:"B5.1",
    text: "Does the change specifically affect the use of the device?",
    yes:13,
    no:39,
  },
  /*{
    id: 38,
    type: "yesno",
    text: "B5.1 Does the change specifically affect the use of the device?",
    yes:13,
    no:39,
  },*/
  {
    id: 39,
    type: "yesno",
    pointer:"B5.2",
    text: "Does the risk assessment identify any new or significantly modified risks?",
    yes:13,
    no:40,
  },
  {
    id: 40,
    type: "yesno",
    pointer:"B5.3",
    text: "Is clinical data necessary ?",
    yes:13,
    no:41,
  },
  {
    id: 41,
    type: "yesno",
    pointer:"B5.4",
    text: "Any unexpected issues from V&V activities?",
    yes:13,
    no:23,
  },
  {
    id: 42,
    type: "yesno",
    pointer:"1.4",
    text: "Material change?",
    yes:43,
    no: 51,
  },
  {
    id: 43,
    type: "yesno",
    pointer:"C1",
    text: "Is the device an IVD?",
    yes:45,
    no:44,
  },
  {
    id: 44,
    type: "info",
    text: "If Company does not manufacture IVD products no further steps.",
    next: null,
  },
  {
    id: 45,
    type: "yesno",
    pointer:"C2",
    text: "Change in material type, formulation, chemical composition, or the materials processing?",
    yes:46,
    no: 23,
  },
  {
    id: 46,
    type: "yesno",
    pointer:"C3",
    text: "Will the changed material directly or indirectly contact body tissues or fluids?",
    yes:48,
    no: 47,
  },
  {
    id: 47,
    type: "yesno",
    pointer:"C5",
    text: "Could the change affect performance specifications?",
    yes:36,
    no: 49,
  },
  {
    id: 48,
    type: "yesno",
    pointer:"C4",
    text: "Does a risk assessment identify any new or increased biocompatibility concerns?",
    yes: 50,
    no: 47,
  },
  {
    id: 49,
    type: "info",
    pointer:"C6",
    text: "Is the proposed change a result of a new serious adverse event, new failure mode, higher than anticipated complaint rate, or a product deficiency that calls into question the safety or effectiveness of the current product on the market?",
    yes: 13,
    no: 23,
  },
  {
    id: 50,
    type: "yesno",
    pointer:"C4.1",
    text: "Has the manufacturer used the same material in a similar legally marketed device (including formulation, processing, type and duration of contact, etc.)?",
    yes:47,
    no: 13,
  },
  {
    id: 51,
    type: "yesno",
    pointer:"1.5",
    text: "Performance change?",
    yes:52,
    no: 56,
  },
  {
    id: 52,
    type: "yesno",
    pointer:"D1",
    text: "Does the change alter the operating principle of the IVD?",
    yes: 13,
    no: 53,
  },
  {
    id: 53,
    type: "yesno",
    pointer:"D2",
    text: "Is the change identified in a device-specific final guidance or classification regulation?",
    yes: 13,
    no: 54,
  },
  {
    id: 54,
    type: "yesno",
    pointer:"D3",
    text: "Does a risk-based assessment of the changed device identify any new risks or significantly modified existing risks?",
    yes: 13,
    no: 55,
  },
  {
    id: 55,
    type: "yesno",
    pointer:"D4",
    text: "Do design verification and validation activities produce any unexpected issues of safety or effectiveness?",    
    yes: 13,
    no: 23,
  },
  {
    id: 56,
    type: "yesno",
    pointer:"1.6",
    text: "Software Changes?",    
    yes: 57,
    no: 63,
  },
  {
    id: 57,
    type: "yesno",
    pointer:"F1",
    text: "Is the change made soley to strengthen cybersecurity and does not have any other impact on the software or device?",    
    yes: 23,
    no: 58,
  },
  {
    id: 58,
    type: "yesno",
    pointer:"F2",
    text: "Is the change made soley to return the system into specification of the most recently cleared device?",    
    yes: 23,
    no: 59,
  },
  {
    id: 59,
    type: "yesno",
    pointer:"F3",
    text: [
      "(a) Does the change introduce a new risk or modify an existing risk that could result in significant harm and that is not effectively mitigated in the most recently cleared device?",
      "(b)Does the change create or necessitate a new risk control measure or a modification of an existing risk control measure for a hazardous situation that could result in significant harm?"
    ],
    yes: 13,
    no: 60,
  },
  {
    id: 60,
    type: "yesno",
    pointer:"F4",
    text: "Could the change significantly affect clinical functionality or performance specifications that are directly associated with the intended use of the device?",    
    yes: 13,
    no: 61,
  },
  {
    id: 61,
    type: "yesno",
    pointer:"F5",
    text: "F5 Is the change made to any of the following? (a) Infrastructure, (b) Architecture, (c) Core Algorithm, (d) Clarification of requirement No change to functionality, (e) Cosmetic changes No change to functionality, (f) Reengineering and refactoring",    
    yes: 23,
    no: 62,
  },
  {
    id: 62,
    type: "info",
    text: "Refer to FDA Guidance to determine whether or not a new 510(k) is required.",
    next: null,
  },
  {
    id: 63,
    type: "yesno",
    pointer:"1.7",
    text: "Human Factor change?",
    yes: 64,
    no: 74,
  },
  {
    id: 64,
    type: "info",
    pointer:"2.6.1",
    text: "Does the change affect the Human Factors or User Interface",
    yes: 65,
    no: 66,
  },
  {
    id: 65,
    type: "yesno",
    pointer:"2.6.2",
    text: "Does the change User Interface?",
    yes: 67,
    no: 66,
  },
  {
    id: 66,
    type: "info",
    text: "Proceed to 2.7",
    next: null,
  },
  {
    id: 67,
    type: "yesno",
    pointer:"2.6.3",
    text: "Does the change require new or changed critical tasks?",
    yes: 68,
    no: 66,
  },
  {
    id: 68,
    type: "yesno",
    pointer:"2.6.4",
    text: "Do the new or changed critical tasks pose greater use-related risk than the existing user interface",
    yes: 69,
    no: 70,
  },

  {
    id: 69,
    type: "yesno",
    pointer:"2.6.5",
    text: "Is there existing data to provide evidence of not needing validation data",
    yes: 71,
    no: 72,
  },
  {
    id: 70,
    type: "info",
    text: "Document to file and  Complete Threshold Analysis to document assessment of UI changes. ",
    next:66,
  },
  {
    id: 71,
    type: "info",
    text: "Document to file",
    next:66,
  },
  {
    id: 72,
    type: "yesno",
    pointer:"2.6.6",
    text: "Is new Human Factor validation testing required",
    yes: 73,
    no: 71,
  },

  {
    id: 73,
    type: "info",
    text: "510(k) is likely required.",
    next:null,
  },
  {
    id: 74,
    type: "yesno",
    pointer:"1.7",
    text: "Additional Considerations",
    yes:75,
    no:78,
  },

  {
    id: 75,
    type: "yesno",
    pointer:"2.7.1",
    text: "Does a change in user or use environment affect the devices risk profile? ",
    subheading:"Document to file.",
    yes:13,
    no:76,
  },
  {
    id: 76,
    type: "yesno",
    pointer:"2.7.2",
    text: "Does a change in frequency or duration of use affect the device use profile?",
    subheading:"Document to file.",
    yes:13,
    no:77,
  },
  {
    id: 77,
    type: "yesno",
    pointer:"2.7.3",
    text: "Does a change concerning the compatibility or interoperability of the device with other devices, components, or accessories affect the overall risk profile of the device? ",
    subheading:"Document to file.",
    yes:13,
    no:23,
  },
  {
    id: 78,
    type: "yesno",
    pointer:"1.8",
    text: "IDE change assessment?",
    yes:79,
    no:83,
  },
  {
    id: 79,
    type: "yesno",
    pointer:"G1",
    text: "Does the proposed change impact the IDE Clinical Protocol or Investigational Plan?",
    yes:80,
    no:81,
  },
  {
    id: 80,
    type: "yesno",
    pointer:"G2",
    text: "Does the proposed change affect the validity of the data or information resulting from the completion of the approved protocol",
    yes:82,
    no:83,
  },
  {
    id: 81,
    type: "yesno",
    pointer:"G7",
    text: "Any changes proposed for the device or manufacturing process?",
    subheading:"Document no further regulatory consideration is required.",
    yes:85,
    no:86,
   },
  {
    id: 82,
    type: "info",
    text: "An IDE statement is required.",
    next:null,
  },
  {
    id: 83,
    type: "yesno",
    pointer:"G3",
    text: "Does the proposed change affect the relationship of the likely patient risk to benefit ratio relied upon to approve the original protocol?",
    yes:82,
    no:84,
  },

  {
    id: 84,
    type: "yesno",
    pointer:"G4",
    text: "Does the proposed change affect the scientific soundness of the investigational plan?",
    yes:82,
    no:85,
  },


  {
    id: 85,
    type: "yesno",
    pointer:"G5",
    text: "Does the proposed change affect the rights, safety, or welfare of the human subjects involved in the investigation?",
    yes:82,
    no:86,
  },

  {
    id: 86,
    type: "yesno",
    pointer:"G6",
    text: "Is the proposed change a minor change to the purpose of the study, risk analysis, monitoring procedure, labeling, informed consent materials, or IRB information",
    yes:87,
    no:88,
  },
  {
    id: 87,
    type: "info",
    text: "Include in IDE annual report.",
    next:null,
  },
  {
    id: 88,
    type: "info",
    text: "A 5-day notice is required.",
    next:null,
  },

  {
    id: 83,
    type: "info",
    text: " Document Rationale in DRA Form (DOC-00001)",
    next:84,
  },
  {
    id: 84,
    type: "info",
    text: "Commence Product Sale",
    next: null,
  },
  {
    id: 85,
    type: "info",
    text: "Refer to FDA Guidance tp determine of 5 day notice or IDE suppliment",
    next: null,
  },
  {
    id: 86,
    type: "info",
    text: "Document no further regulatory consideration is required.",
    next: null,
  }
  
];

export default questions;
