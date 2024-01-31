export const handlerPaginator = (result) =>{
    return {
        empty:result.empty,
        first:result.first,
        last:result.last,
        number:result.number,
        numberOfElements:result.numberOfElements,
        pageable:result.pageable,
        size:result.size,
        sort:result.sort,
        totalElements:result.totalElements,
        totalPages:result.totalPages
    }

}


