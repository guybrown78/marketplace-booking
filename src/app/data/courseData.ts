const courseData = [
  {
    "name": "Abrasive Wheels"
  },
  {
    "name": "Advanced Hub Rescue (AHR)"
  },
  {
    "name": "Advanced Working at Height and Rescue - Refresher"
  },
  {
    "name": "Asbestos Awareness"
  },
  {
    "name": "Banksman Slinger Training"
  },
  {
    "name": "Basic Welding"
  },
  {
    "name": "BINDT Dye Penetrant Inspection PCN Level 2"
  },
  {
    "name": "BINDT Magnetic Particle Inspection (MPI) PCN Level 2"
  },
  {
    "name": "BINDT Ultrasonic Testing (UT) 3.1 3.2 PCN Level 2"
  },
  {
    "name": "BINDT Ultrasonic Testing (UT) 3.8 3.9 PCN Level 2"
  },
  {
    "name": "BINDT Ultrasonic Testing (UT) Plate Testing PCN Level 2 (Thickness and Lamination)"
  },
  {
    "name": "BINDT Welding Inspection PCN Level 2"
  },
  {
    "name": "Boat Transfer"
  },
  {
    "name": "Breathing Apparatus Instructors Course"
  },
  {
    "name": "Bridging Course"
  },
  {
    "name": "Chester Step Examination"
  },
  {
    "name": "CISRS Advanced Level 3 Scaffolding"
  },
  {
    "name": "CISRS Advanced Scaffold Inspection"
  },
  {
    "name": "CISRS Advanced Scaffolding 2 Day Skills Test"
  },
  {
    "name": "CISRS Basic Scaffold Inspection"
  },
  {
    "name": "CISRS COTS (CISRS Operative Training Scheme)"
  },
  {
    "name": "CISRS Part 1 Scaffolding Tube & Fitting"
  },
  {
    "name": "CISRS Part 2 Scaffolding & Tubing"
  },
  {
    "name": "CISRS Part 2 Scaffolding Tube & Fitting"
  },
  {
    "name": "CISRS Scaffolding Awareness"
  },
  {
    "name": "CISRS Scaffolding CPD Refresher"
  },
  {
    "name": "CISRS Skills Test"
  },
  {
    "name": "City and Guilds - Working in High Risk Confined Spaces"
  },
  {
    "name": "City and Guilds - Working in Low Risk Confined Spaces"
  },
  {
    "name": "City and Guilds - Working in Medium Risk Confined Spaces"
  },
  {
    "name": "Coded Welding"
  },
  {
    "name": "Coded Welding"
  },
  {
    "name": "Commercial Drone Operator Training"
  },
  {
    "name": "CompEx Electrical"
  },
  {
    "name": "CompEx Electrical Refresher"
  },
  {
    "name": "CompEx Foundation"
  },
  {
    "name": "Confined Space Entry and Rescue"
  },
  {
    "name": "Confined Space Entry Awareness with Breathing Apparatus"
  },
  {
    "name": "Confined Space Rescue and Recovery of a Casualty"
  },
  {
    "name": "COSHH Assessor"
  },
  {
    "name": "Digital Train The Painter - Abrasive Blast Cleaner"
  },
  {
    "name": "Digital Train The Painter - Gold"
  },
  {
    "name": "Digital Train The Painter - Protective Coatings Applicator (Mandatory)"
  },
  {
    "name": "Digital Train the Painter - Sprayer Painter"
  },
  {
    "name": "ECITB Appointed Person Moving Loads"
  },
  {
    "name": "ECITB Becoming an Effective Communicator"
  },
  {
    "name": "ECITB CCNSG Safety Passport"
  },
  {
    "name": "ECITB CCNSG Safety Passport - Refresher"
  },
  {
    "name": "ECITB High Risk Confined Space"
  },
  {
    "name": "ECITB Improving Job Site Effectiveness"
  },
  {
    "name": "ECITB Knowledge Tests"
  },
  {
    "name": "ECITB Leading a Team Safely (LaTS)"
  },
  {
    "name": "ECITB Low Risk Confined Space"
  },
  {
    "name": "ECITB Manual Handling"
  },
  {
    "name": "ECITB Mechanical Joint Integrity (MJI10 & MJI19)"
  },
  {
    "name": "ECITB Mechanical Joint Integrity (MJI10 MJI18 MJI19)"
  },
  {
    "name": "ECITB Medium Risk Confined Space"
  },
  {
    "name": "ECITB MJI10: Hand Torque Bolted Connection Techniques"
  },
  {
    "name": "ECITB MJI18: Hydraulic Tension Bolted Connection Techniques"
  },
  {
    "name": "ECITB MJI19: Hydraulic Torque Bolted Connection Techniques"
  },
  {
    "name": "ECITB Role of an Effective Supervisor"
  },
  {
    "name": "ECITB SBT01 - Assemble and Install Small Bore Tubing with Twin Ferrule Mechanical Grip Fittings"
  },
  {
    "name": "ECITB Technical Mechanical Joint Integrity (TMJI)"
  },
  {
    "name": "ECITB Technical SBT Tests"
  },
  {
    "name": "ECITB Technical Test - TICA-A01 Industrial Coatings Airless Spray Application"
  },
  {
    "name": "ECITB Technical Test - TICA-A02 Industrial Coatings Brush Application"
  },
  {
    "name": "ECITB Technical Test - TICA-P 01 Abrasive Blast Cleaning (Direct Pressure)"
  },
  {
    "name": "ECITB TMJI - 10-11-18-19-20 Combined"
  },
  {
    "name": "ECITB Working at Height - Unit 2 PPE User"
  },
  {
    "name": "Eddy Current Level 1"
  },
  {
    "name": "Eddy Current Level 2"
  },
  {
    "name": "Eddy Current Testing PCN Level 1 & 2 Combined"
  },
  {
    "name": "Electrical Safety Awareness"
  },
  {
    "name": "Fire Warden"
  },
  {
    "name": "Forklift Truck Training (ITSSAR)"
  },
  {
    "name": "GOTCHA Rescue"
  },
  {
    "name": "GWO Advanced Rescue Training (ART) Combined"
  },
  {
    "name": "GWO Advanced Rescue Training (ART) Refresher"
  },
  {
    "name": "GWO Basic Safety Training (BST) Package"
  },
  {
    "name": "GWO Basic Safety Training Refresher Package"
  },
  {
    "name": "GWO Basic Technical Training (BTT) Combined"
  },
  {
    "name": "GWO Basic Technical Training – Electrical"
  },
  {
    "name": "GWO Basic Technical Training – Hydraulics"
  },
  {
    "name": "GWO Basic Technical Training – Mechanical"
  },
  {
    "name": "GWO Blade Repair Training"
  },
  {
    "name": "GWO BTT Merit Gap Training"
  },
  {
    "name": "GWO Enhanced First Aid (EFA)"
  },
  {
    "name": "GWO Enhanced First Aid Refresher (EFAR)"
  },
  {
    "name": "GWO Fire Awareness"
  },
  {
    "name": "GWO First Aid"
  },
  {
    "name": "GWO First Aid Refresher"
  },
  {
    "name": "GWO Manual Handling"
  },
  {
    "name": "GWO Sea Survival"
  },
  {
    "name": "GWO Sea Survival & Transfer Refresher"
  },
  {
    "name": "GWO Slinger Signaller"
  },
  {
    "name": "GWO Working at Height"
  },
  {
    "name": "GWO Working at Height & Manual Handling Combined"
  },
  {
    "name": "GWO Working at Height Refresher With Manual Handling"
  },
  {
    "name": "HAVS Awareness"
  },
  {
    "name": "HSE Offshore First Aid"
  },
  {
    "name": "HSE Offshore First Aid Refresher"
  },
  {
    "name": "IET 18th Edition Wiring Regulations 1 Day Refresher: City and Guilds"
  },
  {
    "name": "IET 18th Edition Wiring Regulations: City and Guilds"
  },
  {
    "name": "Insulation Skills Test"
  },
  {
    "name": "Introduction to Welding & Assessment Day"
  },
  {
    "name": "IOSH Managing Safely"
  },
  {
    "name": "IOSH Work Equipment and Machinery Safety Risk Assessment"
  },
  {
    "name": "IOSH Working Safely"
  },
  {
    "name": "IPAF (Mobile Elevated Work Platform Training)"
  },
  {
    "name": "IRATA Rope Access Level 1 2 or 3"
  },
  {
    "name": "ITC Advanced First Aid and Incident Management"
  },
  {
    "name": "ITC Emergency First Aid at Work Including Electric Shock"
  },
  {
    "name": "ITC Emergency First Aid At Work Level 3 (RQF)"
  },
  {
    "name": "ITC First Aid At Work Level 3 (RQF)"
  },
  {
    "name": "ITC First Aid At Work Level 3 (RQF) Refresher"
  },
  {
    "name": "ITC Level 2 Award in Basic Life Support and Safe Use of an Automated External Defibrillator"
  },
  {
    "name": "LOLER Awareness"
  },
  {
    "name": "Manual Handling"
  },
  {
    "name": "Manual Handling Assessor"
  },
  {
    "name": "NEBOSH International General Certificate in Occupational Health and Safety"
  },
  {
    "name": "NEBOSH National General Certificate in Occupational Health and Safety"
  },
  {
    "name": "Non-Destructive Testing (NDT) Appreciation - Career in NDT"
  },
  {
    "name": "Non-Destructive Testing Appreciation - Managers and Supervisors"
  },
  {
    "name": "Norwegian Escape Chute"
  },
  {
    "name": "Offshore Medical & Chester Step"
  },
  {
    "name": "Offshore Medical inc. Fit To Train"
  },
  {
    "name": "Offshore Oil & Gas Medical"
  },
  {
    "name": "Offshore S-Cape Training"
  },
  {
    "name": "OPITO Application of Insulation Systems Competence Assessment (Level 2)"
  },
  {
    "name": "OPITO Application of Insulation Systems Training Level 1"
  },
  {
    "name": "OPITO Banksman & Slinger Training Stage 1"
  },
  {
    "name": "OPITO Banksman Slinger Competence Assessment (Stage 3 & 4)"
  },
  {
    "name": "OPITO Basic H2S Training"
  },
  {
    "name": "OPITO Blaster-Sprayer Competence Assessment (Level 2)"
  },
  {
    "name": "OPITO Blaster-Sprayer Training Level 1"
  },
  {
    "name": "OPITO BOSIET with CA-EBS"
  },
  {
    "name": "OPITO Combined BOSIET"
  },
  {
    "name": "OPITO Combined FOET"
  },
  {
    "name": "OPITO Combined Helideck / Offshore Emergency Response Team Member (HERTM/OERTM)"
  },
  {
    "name": "OPITO Compressed Air - EBS"
  },
  {
    "name": "OPITO Digital BOSIET (D-BOSIET) with CA-EBS"
  },
  {
    "name": "OPITO FOET with CA-EBS"
  },
  {
    "name": "OPITO Helideck Emergency Response Team Member (HERTM)"
  },
  {
    "name": "OPITO Helideck Emergency Response Team Member (HERTM) Further"
  },
  {
    "name": "OPITO Helideck Operations Initial Training (HOIT)"
  },
  {
    "name": "OPITO HUET with CA-EBS"
  },
  {
    "name": "OPITO MIST"
  },
  {
    "name": "OPITO Offshore Emergency Response Team Leader (OERTL)"
  },
  {
    "name": "OPITO Offshore Emergency Response Team Leader (OERTL) Further"
  },
  {
    "name": "OPITO Offshore Emergency Response Team Member (OERTM)"
  },
  {
    "name": "OPITO Offshore Emergency Response Team Member (OERTM) Further"
  },
  {
    "name": "OPITO Oil & Gas Fireproofing Training Level 1"
  },
  {
    "name": "OPITO Oil & Gas Industry Fireproofing Competence Assessment (Level 2)"
  },
  {
    "name": "OPITO Rigger Competence Assessment (Stage 3 & 4)"
  },
  {
    "name": "OPITO Rigger Training Stage 1"
  },
  {
    "name": "Overhead Crane"
  },
  {
    "name": "PUWER Assessor"
  },
  {
    "name": "Qualitative Face Fit Test"
  },
  {
    "name": "Quantitative Face Fit Test"
  },
  {
    "name": "Radiographic Interpretation Level 2"
  },
  {
    "name": "RigEx Rigging and Lifting Handbook"
  },
  {
    "name": "Rigging and Lifting"
  },
  {
    "name": "Rigging Loft Management & Equipment Inspection"
  },
  {
    "name": "Risk Assessment Training"
  },
  {
    "name": "Rollgliss R250 Rescue"
  },
  {
    "name": "Rollgliss R350 Working at Height and Rescue"
  },
  {
    "name": "Rope Access Appreciation"
  },
  {
    "name": "RUK Wind Turbine Medical"
  },
  {
    "name": "Scaffolding NVQ Level 2 Portfolio Build"
  },
  {
    "name": "Scaffolding NVQ Level 3 Portfolio Build"
  },
  {
    "name": "SHARPS Training"
  },
  {
    "name": "Shoulder Measurements"
  },
  {
    "name": "Skylotec Uplift Rescue"
  },
  {
    "name": "Supervisor Initial"
  },
  {
    "name": "Supervisor Revalidation"
  },
  {
    "name": "Surface Preparation - Bristle Blaster Training"
  },
  {
    "name": "TEST"
  },
  {
    "name": "TEST Course"
  },
  {
    "name": "Train the Painter - Abrasive Blast Cleaner"
  },
  {
    "name": "Train the Painter - Gold"
  },
  {
    "name": "Train the Painter - Protective Coatings Applicator (Mandatory)"
  },
  {
    "name": "Train the Painter - Sprayer Painter"
  },
  {
    "name": "UKATA Asbestos Awareness"
  },
  {
    "name": "Underwater Welding"
  },
  {
    "name": "Underwater Welding"
  },
  {
    "name": "Working at Height - Unit 1 Height Safety and Harness Awareness"
  },
  {
    "name": "Working at Height - Unit 2 PPE User"
  },
  {
    "name": "Working at Height - Unit 3 Use of Rescue Equipment"
  },
  {
    "name": "Working at Height - Unit 4 Managers and Supervisors"
  },
  {
    "name": "Working at Height - Unit 5 Portable Ladder Usage and Inspection"
  },
  {
    "name": "Working at Height - Unit 6 PPE Inspection"
  },
  {
    "name": "Working at Height - Unit 7 Practical Management"
  }
]

export { courseData }