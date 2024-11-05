import { useMutation } from '@tanstack/vue-query';
import { useApi } from '@/composables/use-api'; 
import Swal from 'sweetalert2';
import type { AxiosError } from 'axios';
import type { ServerError } from '../dto/serverError.dto';
import type { ItemCatalogoResponse } from '../dto/ItemCatalogoResponse.dto';



export const useConsultarCatalogo = () => {
  const mutation = useMutation({
    mutationFn: async (codigoCatalogo: string) => {
      // Realiza la llamada API para obtener los items del catálogo
      const response = await useApi.get<ItemCatalogoResponse[]>(`/api/v1/item-catalogo/${codigoCatalogo}`);
      return response.data;
    },
    // Manejo de errores
    onError: (error: AxiosError) => {
      // Maneja el error y muestra un mensaje adecuado
      const data = error.response?.data as ServerError;
      const serverMessage = data?.message || 'Ocurrió un error al obtener el catálogo';

      // Muestra el error usando SweetAlert
      Swal.fire({
        title: 'Error',
        text: serverMessage,
        icon: 'error',
      });
    },
  });

  return mutation;
};

