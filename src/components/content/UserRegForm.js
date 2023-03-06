import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import './UserRegForm.css';

import { Container ,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
}  from "reactstrap";

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { pokemonTypes } from './pokemonTypes';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


function UserRegForm() {

  //const [userFormValues, setUserFormValues] = useState({});  
  const [firstName, setFirstName] = useState();  
  const [lastName, setLastName] = useState();  
  const [phoneNumber, setPhoneNumber] = useState();  
  const [address, setAddress] = useState();  
  const [city, setCity] = useState();  
  const [province, setProvince] = useState();  
  const [zipCode, setZipCode] = useState();  
  const [agreeCheckbox, setAgreeCheckbox] =   useState(false);  

  
  const [pokemonSelected, setpokemonSelected] = useState();  

  const progressBarName = ['UserForm','PokemonSelect','Review','Submitted'];
  const [progressBar, setProgressBar] = useState(progressBarName[0]);

  const ResetUserFormState = () => {

    setFirstName();
    setLastName();
    setPhoneNumber();
    setAddress();
    setCity();
    setProvince();
    setZipCode();
    setpokemonSelected();
    //setProgressBar(progressBarName[0]);   
    setAgreeCheckbox(false);

  }

  //localStorage.clear();  //Clear localStorage
  // Loading saved data in browser local storage
  useEffect(() => {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const phoneNumber = localStorage.getItem('phoneNumber');
    const address = localStorage.getItem('address');
    const city = localStorage.getItem('city');
    const province = localStorage.getItem('province');
    const zipCode = localStorage.getItem('zipCode');
    const pokemonSelected =JSON.parse(localStorage.getItem('pokemonSelected'));
    const progressBar = localStorage.getItem('progressBar');
    const agreeCheckbox = localStorage.getItem('agreeCheckbox');
   
    if (firstName) {setFirstName(firstName);}
    if (lastName) {setLastName(lastName);}
    if (phoneNumber) {setPhoneNumber(phoneNumber);}
    if (address) {setAddress(address);}
    if (city) {setCity(city);}
    if (province) {setProvince(province);}
    if (zipCode) {setZipCode(zipCode);}
    console.log('pokemonSelected 00',pokemonSelected)
    if (pokemonSelected) {setpokemonSelected(pokemonSelected);}
    if (progressBar) {setProgressBar(progressBar);}
    if (agreeCheckbox) {setAgreeCheckbox(agreeCheckbox);}
  }, []);


  const PokemonConfirmSaved = (value) => {   
    console.log('PokemonConfirmSaved aa',value.value.id, value.value.name);
    //alert(pokemonSelected);

    const myObj = {
      id: value.value.id,
      name: value.value.name
    };

    console.log('myObj',myObj);
    setpokemonSelected(myObj);
    setProgressBar(progressBarName[2]); //'Review'
    localStorage.setItem('pokemonSelected', JSON.stringify(myObj));
    localStorage.setItem('progressBar', progressBarName[2]); //'Review'
  };

  const OnePokemonCard = (props) => {
    return <div className={props.className}>
            <p className="card-name">#{props.id}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.id}.png`}
              height={128}
              width={128}
              alt=""
            />
            <p className="card-name">{props.name}</p>
      </div>          
  }

  
  function PokemonConfirmModal (props) {
    const { isOpen, toggle, value } = props; 
  
    //setpokemonSelected();
    return (
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle} >Your favorite Pokemon is</ModalHeader>
        <ModalBody className={'TextAlignCenter'}>
          <OnePokemonCard id={value.id} name={value.name} className='card'></OnePokemonCard>           
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="primary" onClick={() => PokemonConfirmSaved({value})}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }  

  function PokemonDropdown(props) {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen); 
  
    const [selectedPokemonType , setPokemonType] = useState(null); 
    const [pokeData, setPokeData] = useState([]);
  
    const handleClose = () => {
  
    };
  
    const handleSelect = (event, pokemonType) => {   
      console.log('handleSelect');
      setPokemonType(pokemonType);
      fetchSearch(pokemonType);
    };
  
    const getPokemon = async (res) => {
      res.map(async (item) => {
        const result = await axios.get(item.url);
        setPokeData((state) => {
          state = [...state, result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      });
  
    };
  
  
    const fetchSearch = async (value) => {
      if (value) {
        console.log('c0');
        try {
          const result = await axios.get(
            `https://pokeapi.co/api/v2/type/${value}`         
          );
          setPokeData((state) => {
            state = [result.data];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
          });
        } catch (e) {
          console.log(e);
        }
      } else {
  
        console.log('c');
        if (pokeData.length > 0) {
          setPokeData([]);
        }
      }
    };
  
    let pokemonsArray = [];
  
    // Raise erro if I'm not using try-catch.
    try {
  
      if (pokeData.length > 0){
        pokemonsArray = pokeData[0].pokemon;    
      }
  
    } catch (error) {
      console.error("Failed to parse pokeData:", error);
    }
    
  
    const pokemonList = pokemonsArray.map((item) => {
  
      let pokemonId = item.pokemon.url.split('/')[6];
      let pokemonName = item.pokemon.name;
  
      const myObj = {
        id: pokemonId,
        name: pokemonName
      };
  
      // return  <span className="card-name">#{item.name}</span>;
      return (
          <div
            className="card"
            key={pokemonId}   
            onClick={() => handleClickModal(myObj)}      
          >
            <p className="card-name">#{pokemonId}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonId}.png`}
              height={128}
              width={128}
              alt=""
            />
            <p className="card-name">{item.pokemon.name}</p>
          </div>    
      );
  
    })        
  
  
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState({});
    const toggleModal = () => setIsOpen(!isOpen);
  
    const handleClickModal = (value) => {
      console.log('value',value);
      //setValue({id:pokemonId, name:pokemonName});
      setValue(value);
      toggleModal();    
    }
  
    return (  <>  
  
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{selectedPokemonType === null? 'Select type of Pokemon first' : selectedPokemonType}</DropdownToggle>
            <DropdownMenu>                        
            
                {pokemonTypes.map(pokemonType => (
                   <DropdownItem 
                      onClick={e => handleSelect(e,pokemonType.name)}
                      style={{backgroundColor: pokemonType.color}} key={pokemonType.name}>{pokemonType.name}</DropdownItem>
              ))}
  
                {/* <DropdownItem onClick={e => alert('Alert 버튼')}>
                    Alert 버튼
                </DropdownItem> */}
            </DropdownMenu>
        </ButtonDropdown>
        <PokemonConfirmModal isOpen={isOpen} toggle={toggleModal} value={value} />
        <div className='cardContainer'>
          {pokemonList}        
        </div>
        
        </>
  
        
    )
  }


  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  
    console.log('lastName',e.target.lastName.value);
    if (e.target.checkValidity() === false) {
      console.log("Not submitted");
    } else {
      setProgressBar(progressBarName[1]) //PokemonSelect
      localStorage.setItem('progressBar', progressBarName[1]);
      console.log("Submitted!");
    }
  
    e.target.classList.add("was-validated");
  }

  
const ModalAlert = (props) => {
  console.log('props.isOpen',props.isOpen)
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  
  return (
    <div>      
      <Modal isOpen={modalOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal}>Alert!</ModalHeader>
        <ModalBody>
          {props.message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

  const Breadcrumbs = () => {

    // 0.UserForm 1.PokemonSelect 2.Review 3.Submitted
    //progressStatusName = ['','PokemonSelect','Review','Submitted'];

    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    const handleClick = (progressBarNameIndex) => {
          
          let currentIndex;                   
          //Find current progressBarName Index
          for(let i=0; i< progressBarName.length; i++){
            if(progressBarName[i] === progressBar) currentIndex = i;
          }

          if(currentIndex === 3){
            setModalOpen(true);
          }

          //console.log('currentIndex',currentIndex,'progressBarNameIndex',progressBarNameIndex)
          if (currentIndex != 3 && progressBarNameIndex < currentIndex) {
            setProgressBar(progressBarName[progressBarNameIndex])
          }        
    };
  
    const msg ='Sorry. You can not go back after submitting.<br/>Please click Done button.';  

    return (
      <div>
        <Breadcrumb tag="nav" listTag="div">
          <BreadcrumbItem tag="a" active={progressBar == 'UserForm'}  href="#" onClick={() => handleClick(0)}>User Form</BreadcrumbItem>
          <BreadcrumbItem tag="a" active={progressBar == 'PokemonSelect'} href="#" onClick={() => handleClick(1)}>Select Pokemon</BreadcrumbItem>
          <BreadcrumbItem tag="a" active={progressBar == 'Review'}href="#" onClick={() => handleClick(2)}>Review</BreadcrumbItem>
          <BreadcrumbItem tag="a" active={progressBar == 'Submitted'} onClick={() => handleClick(3)}>Submitted</BreadcrumbItem>
        </Breadcrumb>
        <div>      
          <Modal isOpen={modalOpen} toggle={toggleModal} centered>
            <ModalHeader toggle={toggleModal}>Alert!</ModalHeader>
            <ModalBody>
              {msg}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleModal}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );  
  };

  const handleAgreeCheckboxChange = (event) => {
    setAgreeCheckbox(event.target.checked);
    localStorage.setItem('agreeCheckbox', event.target.checked);
  };

  let contextControl = null;

  if(progressBar =='PokemonSelect'){

    let selectedPokemon = null;
    let selectionWording = 'Select your favorite Pokemon';

    console.log('pokemonSelected2',pokemonSelected)
    if (pokemonSelected){
      selectionWording = 'Or Select the another Pokemon again';
      selectedPokemon = <div>
        <p>Your Pokemon have been selected already.</p> 
        <OnePokemonCard id={pokemonSelected.id} name={pokemonSelected.name} className='card_TextAlignCenter'></OnePokemonCard>
        <button class="btn btn-primary" type="button" 
          onClick={() =>{
            setProgressBar(progressBarName[2]);            
            localStorage.setItem('progressBar', progressBarName[2]); 
          }}>
          Go to Review
        </button>
      </div>
    }
    contextControl = 
        <Container>
        <Breadcrumbs></Breadcrumbs>
        {selectedPokemon}        
        <br></br>
        <h2>{selectionWording}</h2>
        <br></br>
        <div>            
            <PokemonDropdown></PokemonDropdown>
        </div>
        </Container>


  }else if(progressBar == 'Review'){

    console.log('pokemonSelected',pokemonSelected);
    contextControl =  
    // <Container>
    // <Breadcrumbs></Breadcrumbs>
    // <MyForm></MyForm>
    // </Container>
    <Container>
      <Breadcrumbs></Breadcrumbs>
      <form class="p-4 needs-validation" noValidate onSubmit={handleSubmit}>
        <div class="">
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom01">First name</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              placeholder="First name"
              disabled="true"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);

                const found = e.target.value.match(/\d+/) || [];
                console.log(found);
                if (found.length) {
                  e.target.classList.add("is-invalid");
                  e.target.classList.remove("is-valid");
                  e.target.setCustomValidity("Not valid");
                } else {
                  e.target.classList.remove("is-invalid");
                  e.target.classList.add("is-valid");
                  e.target.setCustomValidity("");
                }

                console.log(e.target.checkValidity());
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">Please provide a name</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input
              type="text"
              name="lastName"
              class="form-control"
              id="validationCustom02"
              placeholder="Last name"
              value={lastName}
              disabled="true" 
              onChange={e => {
                setLastName(e.target.value);
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom03">Phone</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              disabled="true"
              onChange={e => {
                setPhoneNumber(e.target.value);
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          
        </div>

        <div class="col-md-5 mb-3">
            <label htmlFor="validationCustom04">Address</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom04"
              name="Address"
              placeholder="Address"
              value={address}
              disabled="true"
              onChange={e => {
                setAddress(e.target.value);
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-12 mb-3">          
          <div class="row">
            <div class="col-md-3 mb-3">
              <label htmlFor="validationCustom05">City</label>
              <input
                type="text"
                class="form-control"
                id="validationCustom05"
                name="City"
                placeholder="City"
                value={city}
                disabled="true"
                onChange={e => {
                  setCity(e.target.value);
                }}
                required
              />
              <div class="invalid-feedback">Please provide a valid city.</div>
            </div>
            <div class="col-md-3 mb-3">
              <label htmlFor="validationCustom06">Province</label>
              <input
                type="text"
                class="form-control"
                id="validationCustom06"
                name="province"
                placeholder="Province"
                value={province}
                disabled="true"
                onChange={e => {
                  setProvince(e.target.value);
                }}
                required
              />
              <div class="invalid-feedback">Please provide a valid province.</div>
            </div>
            <div class="col-md-3 mb-3">
            <label htmlFor="validationCustom07">Zip</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom07"
              name="zipCode"
              value={zipCode}
              disabled="true"
              onChange={e => {
                setZipCode(e.target.value);
              }}
              placeholder="Zip"
              required
            />
            <div class="invalid-feedback">Please provide a valid zip.</div>
            </div>
          </div>
        
          <div>
            <label htmlFor="validationCustom06">Your favorite PokeMon.</label>
            <div
            className="card_Block"
            key={pokemonSelected.id}                
            >
            <p className="card-name">#{pokemonSelected.id}</p>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonSelected.id}.png`}
              height={128}
              width={128}
              alt=""
            />
            <p className="card-name">{pokemonSelected.name}</p>
          </div>   
        
        
        </div>
         

        </div>       
        <button class="btn btn-primary" type="button" 
          onClick={() =>{
            ResetUserFormState();            
            localStorage.clear();  //Clear localStorage
            setProgressBar(progressBarName[3]);
            localStorage.setItem('progressBar', progressBarName[3]); 
          }}>
          Submit
        </button>
      </form>
  </Container>

  }else if(progressBar == 'Submitted'){
    contextControl =  
    <Container>
      <Breadcrumbs></Breadcrumbs>
      <br></br>
      <br></br>
      <h2>Submission was saved successfully.</h2>
      <br></br>
      <h2>Thank you.</h2>  
      <br></br>
      
      <button class="btn btn-primary" type="button" 
        onClick={() => {
          setProgressBar(progressBarName[0]);
          localStorage.setItem('progressBar', progressBarName[0]); 
        }}>
          Done
      </button>
  </Container>

  }else { 
    console.log('f0')
    // UserInformation
    // contextControl = <MyForm></MyForm>
    contextControl = 
    <Container>
      <Breadcrumbs></Breadcrumbs>
      <form class="p-4 needs-validation" noValidate onSubmit={handleSubmit}>
        <div class="">
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom01">First name</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom01"
              placeholder="First name"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
                localStorage.setItem('firstName', e.target.value);

                const found = e.target.value.match(/\d+/) || [];
                console.log(found);
                if (found.length) {
                  e.target.classList.add("is-invalid");
                  e.target.classList.remove("is-valid");
                  e.target.setCustomValidity("Not valid");
                } else {
                  e.target.classList.remove("is-invalid");
                  e.target.classList.add("is-valid");
                  e.target.setCustomValidity("");
                }

                console.log(e.target.checkValidity());
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">Please provide a name</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom02">Last name</label>
            <input
              type="text"
              name="lastName"
              class="form-control"
              id="validationCustom02"
              placeholder="Last name"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
                localStorage.setItem('lastName', e.target.value);
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4 mb-3">
            <label htmlFor="validationCustom03">Phone</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom03"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={e => {
                setPhoneNumber(e.target.value);
                localStorage.setItem('phoneNumber', e.target.value);
              }}
              required
            />           
            <div class="valid-feedback">Looks good!</div>
          </div>
          
        </div>

        <div class="col-md-5 mb-3">
            <label htmlFor="validationCustom04">Address</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom04"
              name="Address"
              placeholder="Address"
              value={address}
              onChange={e => {
                setAddress(e.target.value);
                localStorage.setItem('address', e.target.value);
              }}
              required
            />
            <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-12 mb-3">          
          <div class="row">
            <div class="col-md-3 mb-3">
              <label htmlFor="validationCustom05">City</label>
              <input
                type="text"
                class="form-control"
                id="validationCustom05"
                name="City"
                placeholder="City"
                value={city}
                onChange={e => {
                  setCity(e.target.value);
                  localStorage.setItem('city', e.target.value);
                }}
                required
              />
              <div class="invalid-feedback">Please provide a valid city.</div>
            </div>
            <div class="col-md-3 mb-3">
              <label htmlFor="validationCustom06">Province</label>
              <input
                type="text"
                class="form-control"
                id="validationCustom06"
                name="province"
                placeholder="Province"
                value={province}
                onChange={e => {
                  setProvince(e.target.value);
                  localStorage.setItem('province', e.target.value);
                }}
                required
              />
              <div class="invalid-feedback">Please provide a valid province.</div>
            </div>
            <div class="col-md-3 mb-3">
            <label htmlFor="validationCustom07">Zip</label>
            <input
              type="text"
              class="form-control"
              id="validationCustom07"
              name="zipCode"
              value={zipCode}
              onChange={e => {
                setZipCode(e.target.value);
                localStorage.setItem('zipCode', e.target.value);
              }}
              placeholder="Zip"
              required
            />
            <div class="invalid-feedback">Please provide a valid zip.</div>
          </div>
        </div>
          
        </div>       
        
        <div class="form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              name="agreeCheckbox"
              value=""
              checked={agreeCheckbox}
              id="invalidCheck"
              required
              onChange={e => {    
                handleAgreeCheckboxChange(e);            
                //setAgreeCheckbox(!agreeCheckbox);
                localStorage.setItem('agreeCheckbox', agreeCheckbox);
              }}
            />
            <label class="form-check-label" htmlFor="invalidCheck">
            I agree to the terms and conditions as set out by the user agreement.
            </label>
            <div class="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">
          Next
        </button>
      </form>
  </Container>

  }

  return contextControl;
}





export default UserRegForm;
