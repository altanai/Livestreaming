package com.aboveinc.dc;

import java.util.HashMap;

import com.wowza.wms.application.*;
import com.wowza.wms.amf.*;
import com.wowza.wms.client.*;
import com.wowza.wms.module.*;
import com.wowza.wms.request.*;
import com.wowza.wms.stream.*;
import com.wowza.wms.util.ModuleUtils;
import com.wowza.wms.rtp.model.*;
import com.wowza.wms.httpstreamer.model.*;
import com.wowza.wms.httpstreamer.cupertinostreaming.httpstreamer.*;
import com.wowza.wms.httpstreamer.smoothstreaming.httpstreamer.*;

public class DCAuthmod extends ModuleBase {
	HashMap<Integer, String> publisherClients =null;
	
  IApplicationInstance appInstance = null;
  
	
	public void onAppStart(IApplicationInstance appInstance)
	{
		this.appInstance = appInstance;
	}
	public void publish(IClient client, RequestFunction function, AMFDataList params)
	{
		String streamName = extractStreamName(client, function, params); 
		if (isStreamNotAllowed(client, streamName))
		{
			sendClientOnStatusError(client, "NetStream.Publish.Denied", "Stream name not allowed for the logged in user: "+streamName);
			client.rejectConnection();
		}
		else{
			 invokePrevious(client, function, params);
		}
	}

	public void releaseStream(IClient client, RequestFunction function, AMFDataList params)
	{
		String streamName = extractStreamName(client, function, params);
		if (isStreamNotAllowed(client, streamName))
		{
			sendClientOnStatusError(client, "NetStream.Publish.Denied", "Stream name not allowed for the logged in user: "+streamName);
			client.rejectConnection();
		}
		else{ 
			invokePrevious(client, function, params);
		}
	}

	public String extractStreamName(IClient client, RequestFunction function, AMFDataList params)
	{
		String streamName = params.getString(PARAM1);
		if (streamName != null)
		{
			String streamExt = MediaStream.BASE_STREAM_EXT;
			
			String[] streamDecode = ModuleUtils.decodeStreamExtension(streamName, streamExt);
			streamName = streamDecode[0];
			streamExt = streamDecode[1];
		}

		return streamName;
	}
	
	public void onConnect(IClient client, RequestFunction function, AMFDataList params) 
	{
		AMFDataObj obj = params.getObject(2);
		
		AMFData data = obj.get("app");
	
		if(data.toString().contains("?")){
		 String[] paramlist = data.toString().split("&");
		 String[] userParam = paramlist[1].split("=");
		 String userName = userParam[1];
		  
			if(this.publisherClients==null){
				this.publisherClients = new HashMap<Integer, String>();
		  }
			 
			if(this.publisherClients.get(client.getClientId())==null){
				getLogger().info("##-> Adding authenticated user: " + userName );
				this.publisherClients.put(client.getClientId(),userName);
			} else {
				client.rejectConnection();
			}  
		}
	}
	
	public void onConnectAccept(IClient client) 
	{
		getLogger().info("onConnectAccept: " + client.getClientId());
	}

	public void onConnectReject(IClient client) 
	{
		getLogger().info("onConnectReject: " + client.getClientId());
	}

	
	public void onDisconnect(IClient client) 
	{
		if(this.publisherClients!=null){
			getLogger().info("##-> Removing user: " + this.publisherClients.get(client.getClientId()) );
			this.publisherClients.remove(client.getClientId());
		}  
	}
	
	public boolean isStreamNotAllowed(IClient client, String streamName)
	{
    WMSProperties localWMSProperties = client.getAppInstance().getProperties();
		String allowedStreamName = localWMSProperties.getPropertyStr(this.publisherClients.get(client.getClientId()));
		String sName = streamName.substring(0, streamName.lastIndexOf("?"));  
		return !sName.toLowerCase().equals(allowedStreamName.toLowerCase().toString()) ;
	}
}