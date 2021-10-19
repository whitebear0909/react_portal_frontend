import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as serviceOrders from "./serviceOrdersRedux";

const QuotesFilter = (props) => {
  const applyFilter = (values) => {
    props.getServiceOrders(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          trnType: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Equipment Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="We">We</option>
                  <option value="Balance">Balance</option>
                  <option value="Th">Th</option>
                  <option value="Ba">Ba</option>
                  <option value="Pi">Pi</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Equipment Type
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, serviceOrders.actions)(QuotesFilter);
