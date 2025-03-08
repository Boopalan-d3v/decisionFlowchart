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
    text: "1.2 Labelling change ?",
    yes:10,
    no:27,
  },
  {
    id: 10,
    type: "yesno",
    text: "A1 Is it a change in the indications for use statement ?",
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
    text: "A1.1 Is it a change from a device labeled for single use only to a device labeled as reusable ?",
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
    text: "A2 Does the change add or delete a contraindication ?",
    yes:25,
    no:15,
  },
  {
    id: 15,
    type: "yesno",
    text: "A3 Is it a change in the waring or precautions ?",
    yes:12,
    no:16,
  },
  {
    id: 16,
    type: "yesno",
    text: "A4 Could it affect the directions for use ?",
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
    text: "A5 (a) Is an update being made to labelling that will require a GUDID submission? (b) Is a non-labelling update to GUDID-applicable data being made? (See FDA website for latest “GDDID” Data Elements Reference Table”)",
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
    text: "A1.2 Is it a change from fix to over the counter OTC use",
    yes:13,
    no:22,
  },
  {
    id: 22,
    type: "yesno",
    text: "A1.3 Is it a change to the device name or to solely improve readability or clarity ?",
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
    text: "A1.4 Does the change describe a new disease condition, or pt pop that the device is intended in diagnosing, treating, preventing, curing or mitigating ?",
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
    text: "A1.5 Does a risk-based assessment identify any new risks or significantly modified existing risks ?",
    yes:25,
    no:23,
  },
  {
    id: 27,
    type: "yesno",
    text: "1.3 Technology, Engineering or Performance change ?",
    yes:28,
    no:42,
  },
  {
    id: 28,
    type: "yesno",
    text: "B1 Is the device an IVD ?",
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
    text: "B2 Is it control mechanism, operating principle, or energy type change ?",
    yes:13,
    no:31,
  },
  {
    id: 31,
    type: "yesno",
    text: "B3 Is it a change in sterilization, cleaning or disinfection ?",
    yes:32,
    no:34,
  },
  {
    id: 32,
    type: "yesno",
    text: "B3.1 Is it a change to Cat.B or novel method, does it lower the SAL, or is it a change to how the device is provided?",
    yes:13,
    no:33,
  },
  {
    id: 33,
    type: "yesno",
    text: "B3.2 Could the change significantly affect performance/biocompatibility?",
    yes:13,
    no:23,
  },
  {
    id: 34,
    type: "yesno",
    text: "B4 Is there a change packaging or expiration dating ?",
    yes:35,
    no:36,
  },
  {
    id: 35,
    type: "yesno",
    text: "B4.1 Is it same method or protocol, describe in previous 510(k), used to support change ?",
    yes:23,
    no:13,
  },
  {
    id: 36,
    type: "yesno",
    text: "B5 Is it any other change in design (e.g.,dimensions, performance specifications, components or accessories, patient/User Interface)?",
    yes:37,
    no:23,
  },
  {
    id: 37,
    type: "yesno",
    text: "B5.1 Does the change specifically affect the use of the device?",
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
    text: "B5.2 Does the risk assessment identify any new or significantly modified risks?",
    yes:13,
    no:40,
  },
  {
    id: 40,
    type: "yesno",
    text: "B5.3 Is clinical data necessary ?",
    yes:13,
    no:41,
  },
  {
    id: 41,
    type: "yesno",
    text: "B5.4 Any unexpected issues from V&V activities?",
    yes:13,
    no:23,
  },
  {
    id: 42,
    type: "yesno",
    text: "1.4 Material change?",
    yes:43,
    no: 51,
  },
  {
    id: 43,
    type: "yesno",
    text: "C1 Is the device an IVD?",
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
    text: "C2 Change in material type, formulation, chemical composition, or the materials processing?",
    yes:46,
    no: 23,
  },
  {
    id: 46,
    type: "yesno",
    text: "C3 Will the changed material directly or indirectly contact body tissues or fluids?",
    yes:48,
    no: 47,
  },
  {
    id: 47,
    type: "yesno",
    text: "C5 Could the change affect performance specifications?",
    yes:36,
    no: 49,
  },
  {
    id: 48,
    type: "yesno",
    text: "C4 Does a risk assessment identify any new or increased biocompatibility concerns?",
    yes: 50,
    no: 47,
  },
  {
    id: 49,
    type: "info",
    text: "C6 Is the proposed change a result of a new serious adverse event, new failure mode, higher than anticipated complaint rate, or a product deficiency that calls into question the safety or effectiveness of the current product on the market?",
    yes: 13,
    no: 23,
  },
  {
    id: 50,
    type: "yesno",
    text: "C4.1 Has the manufacturer used the same material in a similar legally marketed device (including formulation, processing, type and duration of contact, etc.)?",
    yes:47,
    no: 13,
  },
  {
    id: 51,
    type: "yesno",
    text: "1.5 Performance change?",
    yes:52,
    no: 56,
  },
  {
    id: 52,
    type: "yesno",
    text: "D1 Does the change alter the operating principle of the IVD?",
    yes: 13,
    no: 53,
  },
  {
    id: 53,
    type: "yesno",
    text: "D2 Is the change identified in a device-specific final guidance or classification regulation?",
    yes: 13,
    no: 54,
  },
  {
    id: 54,
    type: "yesno",
    text: "D3 Does a risk-based assessment of the changed device identify any new risks or significantly modified existing risks?",
    yes: 13,
    no: 55,
  },
  {
    id: 55,
    type: "yesno",
    text: "D4 Do design verification and validation activities produce any unexpected issues of safety or effectiveness?",    
    yes: 13,
    no: 23,
  },
  {
    id: 56,
    type: "yesno",
    text: "1.6 Software Changes",    
    yes: 57,
    no: 63,
  },
  {
    id: 57,
    type: "yesno",
    text: "F1 Is the change made soley to strengthen cybersecurity and does not have any other impact on the software or device?",    
    yes: 23,
    no: 58,
  },
  {
    id: 58,
    type: "yesno",
    text: "F2 Is the change made soley to return the system into specification of the most recently cleared device?",    
    yes: 23,
    no: 59,
  },
  {
    id: 59,
    type: "yesno",
    text: "F3 ( Does the change introduce a new risk or modify an existing risk that could result in significant harm and that it not effectively mitigated in the most recently cleared device? ( Does the change create or necessitate a new risk control measure or a modification of an existing risk control measure for a hazardous situation that could result in significant harm?",    
    yes: 13,
    no: 60,
  },
  {
    id: 60,
    type: "yesno",
    text: "F4 Could the change significantly affect clinical functionality or performance specifications that are directly associated with the intended use of the device?",    
    yes: 13,
    no: 61,
  },
  {
    id: 61,
    type: "yesno",
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
];

export default questions;
