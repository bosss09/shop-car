import { Injectable } from '@angular/core';
import { FortMockApiHandler } from '@fortmesh/lib/mock-api/mock-api.request-handler';
import { FortMockApiMethods } from '@fortmesh/lib/mock-api/mock-api.types';
import { compact, fromPairs } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class FortMockApiService
{
  private _handlers: { [key: string]: Map<string, FortMockApiHandler> } = {
    'get'    : new Map<string, FortMockApiHandler>(),
    'post'   : new Map<string, FortMockApiHandler>(),
    'patch'  : new Map<string, FortMockApiHandler>(),
    'delete' : new Map<string, FortMockApiHandler>(),
    'put'    : new Map<string, FortMockApiHandler>(),
    'head'   : new Map<string, FortMockApiHandler>(),
    'jsonp'  : new Map<string, FortMockApiHandler>(),
    'options': new Map<string, FortMockApiHandler>(),
  };

  /**
   * Constructor
   */
  constructor()
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Find the handler from the service
   * with the given method and url
   *
   * @param method
   * @param url
   */
  findHandler(method: string, url: string): { handler: FortMockApiHandler | undefined; urlParams: { [key: string]: string } }
  {
    // Prepare the return object
    const matchingHandler: { handler: FortMockApiHandler | undefined; urlParams: { [key: string]: string } } = {
      handler  : undefined,
      urlParams: {},
    };

    // Split the url
    const urlParts = url.split('/');

    // Get all related request handlers
    const handlers = this._handlers[method.toLowerCase()];

    // Iterate through the handlers
    handlers.forEach((handler, handlerUrl) =>
    {
      // Skip if there is already a matching handler
      if ( matchingHandler.handler )
      {
        return;
      }

      // Split the handler url
      const handlerUrlParts = handlerUrl.split('/');

      // Skip if the lengths of the urls we are comparing are not the same
      if ( urlParts.length !== handlerUrlParts.length )
      {
        return;
      }

      // Compare
      const matches = handlerUrlParts.every((handlerUrlPart, index) => handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':'));

      // If there is a match...
      if ( matches )
      {
        // Assign the matching handler
        matchingHandler.handler = handler;

        // Extract and assign the parameters
        matchingHandler.urlParams = fromPairs(compact(handlerUrlParts.map((handlerUrlPart, index) =>
          handlerUrlPart.startsWith(':') ? [handlerUrlPart.substring(1), urlParts[index]] : undefined,
        )));
      }
    });

    return matchingHandler;
  }

  /**
   * Register GET request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onGet(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('get', url, delay);
  }

  /**
   * Register POST request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPost(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('post', url, delay);
  }

  /**
   * Register PATCH request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPatch(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('patch', url, delay);
  }

  /**
   * Register DELETE request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onDelete(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('delete', url, delay);
  }

  /**
   * Register PUT request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onPut(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('put', url, delay);
  }

  /**
   * Register HEAD request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onHead(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('head', url, delay);
  }

  /**
   * Register JSONP request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onJsonp(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('jsonp', url, delay);
  }

  /**
   * Register OPTIONS request handler
   *
   * @param url - URL address of the mocked API endpoint
   * @param delay - Delay of the response in milliseconds
   */
  onOptions(url: string, delay?: number): FortMockApiHandler
  {
    return this._registerHandler('options', url, delay);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register and return a new instance of the handler
   *
   * @param method
   * @param url
   * @param delay
   * @private
   */
  private _registerHandler(method: FortMockApiMethods, url: string, delay?: number): FortMockApiHandler
  {
    // Create a new instance of FortMockApiRequestHandler
    const fortMockHttp = new FortMockApiHandler(url, delay);

    // Store the handler to access it from the interceptor
    this._handlers[method].set(url, fortMockHttp);

    // Return the instance
    return fortMockHttp;
  }
}
