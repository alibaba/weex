package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_AHref_A_Href extends TestFlow {
	public AG_AHref_A_Href() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_AHref");
		testMap.put("testChildCaseInit", "AG_AHref_A_Href");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "href0");
				put("screenshot", "AG_AHref_A_Href_01_href0");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "href1");
				put("screenshot", "AG_AHref_A_Href_02_href1");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
