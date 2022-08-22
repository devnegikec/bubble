import {useEffect, useCallback, useState} from 'react';

import {
  useProductOptions,
  isBrowser,
  useUrl,
  AddToCartButton,
  Money,
  ShopPayButton,
} from '@shopify/hydrogen';

import {Heading, Text, Button} from '~/components';
import { current } from 'tailwindcss/colors';

export function ProductForm() {
  const {pathname, search} = useUrl();
  const [params, setParams] = useState(new URLSearchParams(search));

  const {options} = useProductOptions();
  console.log("options:-", options);

  useEffect(()=> {
    options.map(({name, values}) => {
      if(!params) return;
      const currentValue = params.get(name.toLowerCase()) || null;
      if(currentValue) {
        const matchedValue = values.filter(
          (value) => encodeURIComponent(value.toLocaleLowerCase()) === currentValue,
        );
        setSelectedOption(name, matchedValue[0]);
      } else {
        params.set(
          encodeURIComponent(name.toLowerCase()),
          encodeURIComponent(selectedOptions[name].toLowerCase()),
        ),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
    });
  }, []);
  return (
    <from className="grid gap-10">
      {
        <div className="grid gap-4">
          {
            options.map(({name,values}) => {
              if (values.length === 1) {
                return null;
              }
              return (
                <div>Option</div>
              )
            })
          }
        </div>
      }
    </from>
  )
}