import React, { useRef, useEffect, useState } from 'react';

const DetailsTabNav = ({ product }) => {
  const { _id, description, additionalInformation } = product || {};
  const activeRef = useRef(null);
  const marker = useRef(null);
  
  // Manage the active tab state
  const [activeTab, setActiveTab] = useState('desc');

  // handleActive
  const handleActive = (e, tabId) => {
    setActiveTab(tabId);
    if (e.target.classList.contains('active')) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  }

  useEffect(() => {
    if (activeRef.current?.classList.contains('active')) {
      marker.current.style.left = activeRef.current.offsetLeft + 'px';
      marker.current.style.width = activeRef.current.offsetWidth + 'px';
    }
  }, [activeTab]);

  // nav item
  function NavItem({ active = false, id, title }) {
    return (
      <button
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={e => handleActive(e, id)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div className="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
            <NavItem active={activeTab === 'desc'} id="desc" title="Description" />
            <NavItem active={activeTab === 'additional'} id="additional" title="Additional information" />

            <span ref={marker} id="productTabMarker" className="tp-product-details-tab-line"></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div className={`tab-pane fade ${activeTab === 'desc' ? 'show active' : ''}`} id="nav-desc" role="tabpanel" aria-labelledby="nav-desc-tab" tabIndex="-1">
            <div className="tp-product-details-desc-wrapper pt-60">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* addInfo */}
          <div className={`tab-pane fade ${activeTab === 'additional' ? 'show active' : ''}`} id="nav-additional" role="tabpanel" aria-labelledby="nav-additional-tab" tabIndex="-1">
            <div className="tp-product-details-additional-info ">
              <div className="row justify-content-center">
                <div className="col-xl-10">
                  <table>
                    <tbody>
                      {additionalInformation?.map((item, i) => (
                        <tr key={i}>
                          <td>{item.key}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsTabNav;
