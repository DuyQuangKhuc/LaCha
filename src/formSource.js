import styled from "styled-components";

export const userInputs = [
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "displayName",
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    placeholder: "USA",
  },
];

export const productInputs = [
  {
    id: 1,
    label: "Title",
    type: "text",
    placeholder: "Plant",
  },
  {
    id: 2,
    label: "Name",
    type: "text",
    placeholder: "Name",
  },
  {
    id: 3,
    label: "Category",
    type: "text",
    placeholder: "Plant and garden",
  },
  {
    id: 4,
    label: "Price",
    type: "text",
    placeholder: "100",
  },
  {
    id: 5,
    label: "Stock",
    type: "text",
    placeholder: "in stock",
  },
];

export const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Garden Package",
    accessor: "GardenPackageID",
  },
  {
    Header: "Room",
    accessor: "roomID",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Created on",
    accessor: "createdOn",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "",
    accessor: "icon",
  },
];


export const userColumns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Full Name",
    accessor: "fullName",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Gmail",
    accessor: "gmail",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "",
    accessor: "icon",
  },
];




const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3748;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
const LabelAct = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2f903f;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
const LabelDra = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #94a3b8;
  color: #fff;
  padding: 0 !important;
  margin: 0 3px;
  font-weight: 400 !important;
  padding: 5px 15px;
  border-radius: 50px;
  padding-top: 6px;
  width: 72px;
  height: 27px;
`;
export const data = [
  {
    syllabus: "C# Programing Language",
    code: "NPL",
    createdOn: "22/04/2021",
    createdBy: "HaNTT2",
    duration: "12 days",
    outputStandard: [
      <Label>H4SD</Label>,
      <Label>H4SD</Label>,
      <Label>H4SD</Label>,
    ],
    status: <LabelAct>Active</LabelAct>,
    
  }
]

export const data1 = [
  {
    syllabus: "C# Programing Language",
    code: "NPL",
    createdOn: "22/04/2021",
    createdBy: "HaNTT2",
    duration: "12 days",
    outputStandard: [
      <Label>H4SD</Label>,
      <Label>H4SD</Label>,
      <Label>H4SD</Label>,
    ],
    status: <LabelAct>Active</LabelAct>,
    
  }
]
