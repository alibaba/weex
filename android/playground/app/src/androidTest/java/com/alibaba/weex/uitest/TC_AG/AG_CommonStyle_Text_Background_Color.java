package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_CommonStyle_Text_Background_Color extends TestFlow {
	public AG_CommonStyle_Text_Background_Color() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_CommonStyle");
		testMap.put("testChildCaseInit", "AG_CommonStyle_Text_Background_Color");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "#FF0000");
				put("screenshot", "AG_CommonStyle_Text_Background_Color_01_#FF0000");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "#00FFFF");
				put("screenshot", "AG_CommonStyle_Text_Background_Color_02_#00FFFF");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
