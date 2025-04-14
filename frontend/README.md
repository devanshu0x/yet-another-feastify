# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






{/* Delivery Method Toggle */}
<div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
  <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
    <MapPin className="mr-2 text-[#ff6b35]" size={20} />
    Order Type
  </h2>

  <div className="flex items-center space-x-4 mb-6">
    <button
      type="button"
      onClick={() => setIsDineIn(false)}
      className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
        !isDineIn
          ? 'bg-[#ff6b35] text-white font-medium'
          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
      }`}
    >
      Delivery
    </button>
    <button
      type="button"
      onClick={() => setIsDineIn(true)}
      className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
        isDineIn
          ? 'bg-[#ff6b35] text-white font-medium'
          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
      }`}
    >
      Dine In
    </button>
  </div>

  {isDineIn ? (
    <div className="space-y-4">
      <label htmlFor="tableNumber" className="block text-neutral-300 text-sm mb-1">
        Table Number
      </label>
      <input
        id="tableNumber"
        type="text"
        placeholder="Enter your table number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
      />
    </div>
  ) : (
    <>
      {/* Delivery Address Section */}
              <div className="bg-neutral-800 rounded-lg shadow-lg p-6 mb-6 border border-neutral-700">
                <h2 className="text-xl font-medium text-neutral-100 mb-4 flex items-center">
                  <MapPin className="mr-2 text-[#ff6b35]" size={20} />
                  Delivery Address
                </h2>
                
                {/* Address Selection Toggle */}
                <div className="flex items-center space-x-4 mb-6">
                  <button 
                    type="button"
                    onClick={() => setUseNewAddress(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                      !useNewAddress 
                        ? 'bg-[#ff6b35] text-white font-medium' 
                        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                    }`}
                  >
                    Saved Addresses
                  </button>
                  <button 
                    type="button"
                    onClick={() => setUseNewAddress(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-center transition-colors ${
                      useNewAddress 
                        ? 'bg-[#ff6b35] text-white font-medium' 
                        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                    }`}
                  >
                    New Address
                  </button>
                </div>
                
                {!useNewAddress ? (
                  /* Saved Addresses */
                  <div className="space-y-4">
                    <Listbox value={selectedAddress} onChange={setSelectedAddress}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-neutral-700 rounded-lg border border-neutral-600 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]">
                          <div className="flex items-center">
                            {selectedAddress.type === 'home' && <Home size={18} className="mr-2 text-neutral-400" />}
                            {selectedAddress.type === 'work' && <Building2 size={18} className="mr-2 text-neutral-400" />}
                            {selectedAddress.type === 'other' && <MapPin size={18} className="mr-2 text-neutral-400" />}
                            <span className="block truncate text-neutral-100">{selectedAddress.title}</span>
                          </div>
                          <span className="text-sm text-neutral-400 mt-1 block">{selectedAddress.address}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 w-full bg-neutral-800 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none py-1 border border-neutral-700">
                            {addresses.map((address) => (
                              <Listbox.Option
                                key={address.id}
                                className={({ active }) =>
                                  `${active ? 'bg-neutral-700' : ''}
                                  cursor-pointer select-none relative py-3 pl-4 pr-4`
                                }
                                value={address}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      {address.type === 'home' && <Home size={18} className="mr-2 text-neutral-400" />}
                                      {address.type === 'work' && <Building2 size={18} className="mr-2 text-neutral-400" />}
                                      {address.type === 'other' && <MapPin size={18} className="mr-2 text-neutral-400" />}
                                      <span className={`block truncate ${selected ? 'font-medium text-neutral-100' : 'text-neutral-300'}`}>
                                        {address.title}
                                      </span>
                                    </div>
                                    <span className="text-sm text-neutral-400 mt-1 block">{address.address}</span>
                                    {selected && (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#ff6b35]">
                                        <Check className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                ) : (
                  /* New Address Form */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-neutral-300 mb-2 text-sm">Address Type</label>
                      <RadioGroup value={newAddress.type} onChange={(value) => setNewAddress({...newAddress, type: value})}>
                        <div className="flex space-x-4">
                          {addressTypes.map((type) => (
                            <RadioGroup.Option 
                              key={type.id} 
                              value={type.id}
                              className={({ checked }) => `
                                flex-1 relative rounded-lg shadow-md px-4 py-3 cursor-pointer
                                ${checked ? 'bg-neutral-700 border-2 border-[#ff6b35]' : 'bg-neutral-700 border border-neutral-600'}
                              `}
                            >
                              {({ checked }) => (
                                <div className="flex items-center justify-center">
                                  <type.icon size={18} className={checked ? 'text-[#ff6b35] mr-2' : 'text-neutral-400 mr-2'} />
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium ${checked ? 'text-neutral-100' : 'text-neutral-300'}`}
                                  >
                                    {type.name}
                                  </RadioGroup.Label>
                                </div>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <label htmlFor="addressTitle" className="block text-neutral-300 mb-1 text-sm">Address Title</label>
                      <input
                        type="text"
                        id="addressTitle"
                        placeholder="E.g. Home, Office, Mom's Place"
                        className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                        value={newAddress.title}
                        onChange={(e) => setNewAddress({...newAddress, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="fullAddress" className="block text-neutral-300 mb-1 text-sm">Full Address</label>
                      <textarea
                        id="fullAddress"
                        rows={3}
                        placeholder="Enter your complete address with landmark"
                        className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                        required={useNewAddress}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        className="h-4 w-4 text-[#ff6b35] rounded border-neutral-500 focus:ring-[#ff6b35] bg-neutral-700"
                        checked={newAddress.saveAddress}
                        onChange={(e) => setNewAddress({...newAddress, saveAddress: e.target.checked})}
                      />
                      <label htmlFor="saveAddress" className="ml-2 text-neutral-300 text-sm">
                        Save this address for future orders
                      </label>
                    </div>
                  </div>
                )}
              </div>

    </>
  )}
</div>
